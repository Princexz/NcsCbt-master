import React, { useEffect, useState } from "react";
// import { questions } from "../../../components/shared/questions";
import back from "../../../assets/back.png";
import quit from "../../../assets/quit.png";
import next from "../../../assets/next.png";
import prev from "../../../assets/prev.png";
import { Button } from "../../../components/shared/Button";
import { Modal } from "../../../components/shared/Modal";
import { Header } from "../../../components/shared/Header";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";
import axios from "axios";
import { ProgressBar } from "../../../components/shared/ProgressBar";

export const TakeExam = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    loggedInUserId,
    questions,
    setQuizActive,
    setPracticeHistory,
  } = useUserStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState();
  const [timerId, setTimerId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [score, setScore] = useState("");
  const [message, setMessage] = useState("");
  const [reviewMode, setReviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  let timer;
  let quizDetails;
  const quizType = localStorage.getItem("type");

  useEffect(() => {
    setQuizActive(true);
    if (quizType === "practice") {
      quizDetails = JSON.parse(
        localStorage.getItem("practiceQuestionsDetails")
      );
    } else {
      quizDetails = JSON.parse(localStorage.getItem("examQuestionsDetails"));
    }
    setTimeRemaining(quizDetails.time * 60);
    timer = setInterval(() => {
      setTimerId(timer);
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Stop the timer when timeRemaining reaches 0
          handleSubmit(); // Call the handleSubmit function when the timer ends
          return 0; // Set timeRemaining to 0 to prevent negative values
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (timeRemaining === 0) {
        handleSubmit();
      }
    } else {
      navigate("/login");
    }
  }, [timeRemaining, isLoggedIn]);

  const handleOptionChange = (value, questionId) => {
    setAnswered(true);
    const answer = value;
    const question_id = questionId;
    setAnswers((prevAnswers) => [
      ...prevAnswers.slice(0, currentQuestion),
      value,
      ...prevAnswers.slice(currentQuestion + 1),
    ]);
    const newAnswer = { answer, question_id };
    setSelectedAnswers((prevSelectedAnswers) => {
      const newSelectedAnswers = [...prevSelectedAnswers];
      newSelectedAnswers[currentQuestion] = newAnswer;
      return newSelectedAnswers;
    });
  };

  const handlePrevious = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const token = localStorage.getItem("auth-token");

  const handleSubmit = async () => {
    clearInterval(timerId);
    const practiceData = {
      answers: selectedAnswers,
      userId: loggedInUserId,
      type: "practice",
    };
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://ncs-cbt-api.onrender.com/exam/mark",
        practiceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      const message = response.data.message;
      setIsLoading(false);
      setMessage(message);
      const mark = data.map((item) => item.mark);
      const totalMark = mark.reduce((a, b) => a + b, 0);
      setScore((totalMark / data.length) * 100);
      let reviewData = [];
      if (quizType === "practice") {
        quizDetails = JSON.parse(
          localStorage.getItem("practiceQuestionsDetails")
        );
      } else {
        quizDetails = JSON.parse(localStorage.getItem("examQuestionsDetails"));
      }
      const newReviewData = data.map((item, index) => ({
        question: questions[index].question,
        category: quizDetails.rank,
        userAnswer: selectedAnswers[index].answer,
        correctAnswer: item.correctAnswer,
        options: questions[index].options,
      }));

      reviewData = [...reviewData, ...newReviewData];
      setPracticeHistory(reviewData);
      setResultModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col bg-vector w-full h-screen overflow-y-auto transform transition-all duration-300">
      <div className="flex justify-between items-center p-8 w-full">
        <div className="flex items-center">
          <Button
            title={<img className="w-6" src={back} alt="back" />}
            btnStyles="py-4 px-4"
            btnClick={() => {
              if (
                confirm(
                  "All your progress will be lost, are you sure you want to go back?"
                ) === true
              ) {
                window.history.back();
                setQuizActive(false);
              }
            }}
            disable={quizType === "exam"}
          />
        </div>
        {quizType === "practice" ? (
          <Header title="Practice" />
        ) : (
          <Header title="Exam" />
        )}
      </div>
      {reviewMode ? (
        <div className="flex flex-col md:px-20 px-6 gap-4 -mt-6">
          <div className="flex justify-center text-2xl font-bold">
            Review Questions
          </div>
          <div className="bg-cardgreen text-white p-8 rounded-md flex flex-col gap-6">
            {questions.map((question, i) => (
              <div key={i} className="flex flex-col text-sm gap-2">
                {/* <div className="font-bold text-lg">Question </div> */}
                <div className="md:text-lg">
                  {i + 1}. {question.question}
                </div>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`${
                      selectedAnswers[i]?.answer === option
                        ? "text-yellow font-bold"
                        : ""
                    }
                  flex`}
                  >
                    <span className="mr-3">
                      {String.fromCharCode(65 + optionIndex)}.{" "}
                    </span>
                    <div>{option}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex md:flex-row flex-col py-10 gap-10 px-10">
            <Button
              title="Submit"
              btnStyles="bg-primary text-white px-4 py-3 w-full rounded-md"
              btnClick={handleSubmit}
            />
            <Button
              title="Back to quiz"
              btnStyles="bg-primary text-white px-4 py-3 w-full rounded-md"
              btnClick={() => setReviewMode(false)}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            className="md:hidden flex ml-12 mb-4 gap-2 text-gray-600 cursor-pointer hover:text-primary"
            onClick={() => setShowModal(true)}
          >
            <img src={quit} alt="quit" />
            <span className="text-lg">Quit </span>
          </div>
          <div className="flex gap-8 justify-between items-center w-full px-10">
            <div className="md:w-1/2 md:px-8 px-2 flex flex-col mb-10 gap-8">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="text-3xl">Question {currentQuestion + 1}</div>
                  <div
                    className={`text-3xl font-bold px-4 py-3 ${
                      timeRemaining <= 300
                        ? "animate-pulse text-red-600 bg-transparent"
                        : "text-white bg-red-600"
                    }`}
                  >
                    {Math.floor(timeRemaining / 60)}:
                    {(timeRemaining % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="font-semibold md:text-lg">
                  {questions[currentQuestion].question}
                </div>
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center rounded-lg px-4 py-3 cursor-pointer border border-primary text-primary font-bold  ${
                      answers[currentQuestion] === option
                        ? "bg-primary text-white"
                        : ""
                    }`}
                    onClick={() =>
                      handleOptionChange(option, questions[currentQuestion].id)
                    }
                  >
                    <span className="mr-3">
                      {String.fromCharCode(65 + index)}.{" "}
                    </span>
                    {option}
                  </div>
                ))}
              </div>
              <div
                className="flex md:flex-row flex-col md:justify-evenly gap-8"
                id="navButton"
              >
                <Button
                  title={
                    <div className="flex px-4 py-2 gap-1 items-center">
                      <img src={prev} className="" alt="" />
                      <span>Previous</span>
                    </div>
                  }
                  btnStyles={`text-lg bg-secondary shadow-md px-4 py-2 rounded-lg w-full ${
                    currentQuestion == 0 ? "text-gry bg-gray" : "text-primary"
                  }`}
                  btnClick={handlePrevious}
                  disable={currentQuestion === 0}
                />
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    title="Submit"
                    btnStyles="bg-primary text-white text-lg rounded-lg shadow-md px-4 py-3 w-full"
                    btnClick={() => setReviewMode(true)}
                  />
                ) : (
                  <Button
                    title={
                      <div className="flex px-4 py-2 gap-1 items-center">
                        <img src={next} className="" alt="" />
                        <span>Next</span>
                      </div>
                    }
                    btnStyles={`text-lg bg-primary shadow-md px-4 py-2 rounded-lg w-full text-white`}
                    btnClick={handleNext}
                  />
                )}
              </div>
            </div>
            <div className="md:flex flex-col gap-8 w-1/2 hidden">
              <div className="bg-secondary quiz-vector shadow-md rounded-lg py-10 items-center justify-center p-8 flex flex-col gap-8">
                <div
                  className={`${
                    timeRemaining <= 300
                      ? "bg-transparent text-primary"
                      : "bg-primary text-white"
                  } rounded-full p-6 w-24 h-24 text-center flex flex-col justify-center items-center`}
                >
                  <div>Timer</div>
                  <div
                    className={`text-2xl font-bold ${
                      timeRemaining <= 300 ? "text-red-500 animate-pulse" : ""
                    }`}
                  >
                    {Math.floor(timeRemaining / 60)}:
                    {(timeRemaining % 60).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-10 gap-4 place-items-center">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      title={index + 1}
                      btnStyles={`border ${
                        currentQuestion === index ? "border border-primary" : ""
                      }  ${
                        selectedAnswers[index]
                          ? "bg-primary text-white"
                          : "bg-white "
                      } text-primary rounded shadow-md w-10 h-10`}
                      btnClick={(e) => setCurrentQuestion(index)}
                    />
                  ))}
                </div>
              </div>
              <div
                className="flex gap-2 text-gray-600 cursor-pointer hover:text-primary"
                onClick={() => setShowModal(true)}
              >
                <img src={quit} alt="quit" />
                <span className="text-xl">Quit </span>
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && (
        <Modal
          content={
            <div className="text-primary font-bold text-2xl text-center my-4">
              Are you sure you want to quit?
            </div>
          }
          modStyles="w-1/2 justify-center bg-secondary"
          buttons={
            <div className="flex flex-col md:flex-row gap-6 justify-between w-full p-4 my-4">
              <Button
                title="Yes, Quit"
                btnClick={() => {
                  navigate("/dashboard/result");
                  setQuizActive(false);
                }}
                btnStyles="bg-yellow text-primary px-4 py-3 rounded-md"
              />
              <Button
                title="No, Continue"
                btnClick={() => setShowModal(false)}
                btnStyles="bg-primary text-white px-4 py-3 rounded-md"
              />
            </div>
          }
        />
      )}
      {resultModal && (
        <Modal
          content={
            quizType === "practice" ? (
              <div className="text-primary font-bold text-sm md:text-lg text-center my-4">
                <ProgressBar score={score} />
                {message}
              </div>
            ) : (
              <div className="text-primary font-bold text-sm md:text-lg text-center my-4">
                Your Examination has submitted successfully!
              </div>
            )
          }
          modStyles="w-1/2 justify-center bg-white"
          buttons={
            quizType === "practice" ? (
              <div className="flex justify-center w-full p-4 my-4">
                <Button
                  title="Back to Dashboard"
                  btnClick={() => {
                    navigate("/dashboard/practice");
                    setQuizActive(false);
                  }}
                  btnStyles="border border-primary text-primary px-4 py-3 rounded-md"
                />
              </div>
            ) : (
              <div className="flex justify-center w-full p-4 my-4">
                <Button
                  title="Log Out"
                  btnClick={() => {
                    setIsLoggedIn(false);
                    navigate("/login");
                    setQuizActive(false);
                  }}
                  btnStyles="border border-primary text-primary px-4 py-3 rounded-md"
                />
              </div>
            )
          }
        />
      )}
    </section>
  );
};
