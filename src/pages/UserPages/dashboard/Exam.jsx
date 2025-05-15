import axios from "axios";
import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { useUserStore } from "../../../store/userStore";
import { Button } from "../../../components/shared/Button";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/shared/Modal";

export const ExamPage = () => {
  const { examQuestions, setQuestions, loggedInUserRank, userIsSubscribed } = useUserStore();
  const navigate = useNavigate();
  const [nextRank, setNextRank] = useState("");
  const [exam, setExam] = useState(nextRank);
  const [duration, setDuration] = useState(examQuestions.length * 60 / 60);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    setRank();
    setQuestions(examQuestions);
  }, [exam]);

  const setRank = () => {
    if (loggedInUserRank === "CAI") {
      setNextRank("CAII")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "CAII") {
      setNextRank("AIC");
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "AIC") {
      setNextRank("IC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "IC") {
      setNextRank("ASCII")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "ASCII") {
      setNextRank("ASCI")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "ASCI") {
      setNextRank("DSC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "DSC") {
      setNextRank("SC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "SC") {
      setNextRank("CSC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "CSC") {
      setNextRank("AC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "AC") {
      setNextRank("DC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    } else if (loggedInUserRank === "DC") {
      setNextRank("CC")
      setExam(`${loggedInUserRank}-${nextRank}`)
    }
  }

  return (
    <div className="flex flex-col w-full p-8 md:p-10 gap-6">
      <Header title="Exam" />
      {userIsSubscribed === true ? (examQuestions.length === 0 ? (
        <div className="flex items-center bg-cardgreen p-10 rounded-md text-white justify-center flex-grow">
          <p className="text-2xl text-center">No Examination Available</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row bg-cardgreen p-10 rounded-md text-white justify-between md:items-center gap-10">
          <div>
            <div className="text-white font-bold text-3xl">{exam}</div>
            <div>Duration: {duration} minutes </div>
          </div>
          <div>
            <Button title="Start Exam" btnStyles="bg-yellow text-black px-4 py-3 rounded-md shadow-md" btnClick={() => {
              setShowInstructions(true);
              localStorage.setItem("examQuestionsDetails", JSON.stringify({ rank: exam, time: duration }));
              localStorage.setItem("type", "exam");
            }} />
          </div>
        </div>
      )) :
    (
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-cardgreen p-10 rounded-md text-white flex-grow">
          <p className="text-lg md:text-2xl text-center">Please subscribe to take the exam</p>
          <Button title="Subscribe" btnStyles="bg-yellow text-black px-4 py-3 rounded-md shadow-md" btnClick={() => {
            navigate("/dashboard/user-profile");
          }} />
        </div>
       </div>
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
                    You will have {duration} minutes to complete the exam. A timer
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
              title="Start Exam"
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
