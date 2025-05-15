import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/shared/Modal";
import { Button } from "../../../components/shared/Button";
import { Header } from "../../../components/shared/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/userStore";

export const Practice = () => {
  const navigate = useNavigate();
  const { questions, setQuestions, practiceHistory } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [rank, setRank] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(2);
  const [isLoading, setIsLoading] = useState(false)
  const [time, setTime] = useState();
  const [error, setError] = useState("");
  const token = localStorage.getItem("auth-token");
  let practiceQuestions;
  let category;

useEffect(() => {
  console.log(practiceHistory)
}, [practiceHistory])

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const getPracticeQuestions = async () => {
    if (!numberOfQuestions) {
      setError("Please set number of questions");
    }
    if (!rank) {
      setError("Please select a category");
    } else {
      setIsLoading(true)
      axios
        .post(
          "https://ncs-cbt-api.onrender.com/exam/getPracticeQuestions",
          { rank },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const allQuestions = res.data.data;
          if (allQuestions.length > 0) {
            practiceQuestions = allQuestions.filter(
              (question) => question.category === rank
            );
            setQuestions([]);
            if (numberOfQuestions > practiceQuestions.length) {
              setError(
                "Number of questions exceeds available questions. There are " +
                  practiceQuestions.length +
                  " questions available questions for this category. Please select a lower number of questions."
              );
              return;
            } else {
              const shuffledQuestions = shuffle(practiceQuestions);
              const selectedQuestions = shuffledQuestions.slice(
                0,
                numberOfQuestions
              );
              setQuestions(selectedQuestions);
              localStorage.setItem(
                "practiceQuestionsDetails",
                JSON.stringify({ rank, time: (numberOfQuestions * 60) / 60 })
              );
              setIsLoading(false)
              localStorage.setItem("type", "practice");
              setShowModal(false);
              setShowInstructions(true);
            }
          } else {
            practiceQuestions = [];
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message === "Network Error") {
            alert("Network Error! Check your internet connection")
            setIsLoading(false)
          }
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:">
      <Header title="Practice" />
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="font-bold text-2xl">Review Quiz</div>
            <div>
              <Button
                title="Take Quiz"
                btnStyles="px-4 py-3 bg-primary text-white rounded-md"
                btnClick={() => setShowModal(true)}
              />
            </div>
          </div>
          {practiceHistory.map((question, index) =>
              <div key={index} className="flex flex-col gap-3 my-4 text-sm md:text-md">
                <div>{index + 1}. {question.question}</div>
                {/* <div >User Answer: {question.userAnswer}</div> */}
                <div className="flex flex-col gap-2">{question.options.map((option, i) =>
                <div key={i} className="flex">
                  <span className="mr-3">
                {String.fromCharCode(65 + i)}.{" "}
              </span>
                <div className={`${option === question.userAnswer ? "font-bold text-red-500" : ""} ${option === question.correctAnswer ? "text-primary font-bold" : "" }`}>{option}</div>
                </div>
                )}</div>
              </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          title="Quiz Settings"
          closeModal={() => setShowModal(false)}
          modStyles="bg-secondary md:w-1/2 h-fit"
          content={
            <div className="my-10">
              <div>
                {error && <div className="text-sm text-red-500">{error}</div>}
                <label htmlFor="time">Set Number of Questions</label>
                <input
                  type="tel"
                  id="time"
                  value={numberOfQuestions}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                  placeholder="5 min"
                  onChange={(e) => {
                    setNumberOfQuestions(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div>
                <label htmlFor="rank" className="block py-1 -mb-1">
                  Select Rank
                </label>
                <select
                  id="rank"
                  name="rank"
                  value={rank}
                  onChange={(e) => {
                    setRank(e.target.value);
                    setError("");
                  }}
                  className={`border w-full py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary ${
                    error ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="CAI-CAII">CAI-CAII</option>
                  <option value="CAII-AIC">CAII-AIC</option>
                  <option value="AIC-IC">AIC-IC</option>
                  <option value="IC-ASCII">IC-ASCII</option>
                  <option value="ASCII-ASCI">ASCII-ASCI</option>
                  <option value="ASCI-DSC">ASCI-DSC</option>
                  <option value="DSC-SC">DSC-SC</option>
                  <option value="SC-CSC">SC-CSC</option>
                  <option value="CSC-AC">CSC-AC</option>
                  <option value="AC-DC">AC-DC</option>
                  <option value="DC-CC">DC-CC</option>
                </select>
              </div>
            </div>
          }
          buttons={
            <Button
              title={isLoading ? "Loading..." : "Start Exam"}
              btnStyles={`${isLoading ? "bg-grey animate-pulse text-secondary" : "bg-primary text-white"} py-2 px-4 rounded-md mt-4 w-full`}
              btnClick={getPracticeQuestions}
            />
          }
        />
      )}
      {showInstructions && (
        <Modal
          title="Instructions"
          closeModal={() => setShowInstructions(false)}
          modStyles="bg-secondary w-full h-full my-20 overflow-y-scroll"
          content={
            <div className="rounded-lg px-2 py-3 text-sm md:text-lg md:p-8 mx-auto relative">
              <p className="mb-4">
                Welcome to the NCS CBT platform. Please read the following
                instructions carefully before starting the exam.
              </p>
              <p className="mb-4">
                Before proceeding, ensure that your computer and internet
                connection are working properly. Click on the 'System Check'
                button to verify.
              </p>
              <ol className="list-decimal list-inside mb-4 flex flex-col gap-6">
                <li>
                  <strong>Time Reminder:</strong>{" "}
                  <span className="font-normal">
                    You will have {time} minutes to complete the exam. A timer
                    will be displayed on the screen to help you manage your time
                    effectively.
                  </span>
                </li>
                <li>
                  <strong>Navigation Instructions:</strong>{" "}
                  <span className="font-normal">
                    Use the navigation buttons provided to move between
                    questions. You can go back and forth as needed.
                  </span>
                </li>
                <li>
                  <strong>Answering Format:</strong>{" "}
                  <span className="font-normal">
                    Answer each question by selecting the appropriate option.
                  </span>
                </li>
                <li>
                  <strong>Marking for Review:</strong>{" "}
                  <span className="font-normal">
                    If you're unsure about an answer, you can mark the question
                    for review and return to it later.
                  </span>
                </li>
                <li>
                  <strong>Technical Support Information:</strong>{" "}
                  <span className="font-normal">
                    If you encounter any technical issues during the exam,
                    please raise your hand or contact the invigilator for
                    assistance.
                  </span>
                </li>
                <li>
                  <strong>Academic Integrity Reminder:</strong>{" "}
                  <span className="font-normal">
                    Maintain academic integrity throughout the exam. Any form of
                    cheating or unauthorized assistance is strictly prohibited.
                  </span>
                </li>
                <li>
                  <strong>Exam Duration Notice:</strong>{" "}
                  <span className="font-normal">
                    Once the exam starts, it cannot be paused or extended.
                    Ensure that you manage your time effectively to complete all
                    questions.
                  </span>
                </li>
              </ol>
            </div>
          }
          buttons={
            <Button
              title="Start Quiz"
              btnStyles="bg-primary text-white py-2 px-4 rounded-md mt-4 w-fit mx-auto"
              btnClick={() => {
                setShowInstructions(false);
                navigate("/take-exam");
              }}
            />
          }
        />
      )}
    </div>
  );
};
