import React, { useEffect, useState } from "react";
import { Header } from "../../../components/shared/Header";
import { Button } from "../../../components/shared/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "./categories";
import add from "../../../assets/add.png";
import del from "../../../assets/delete.png";
import { Modal } from "../../../components/shared/Modal";
import axios from "axios";
import { useUserStore } from "../../../store/userStore";
import pdfToText from "react-pdftotext";

export const UploadQuestions = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const { questions, setQuestions } = useUserStore();
  const [questionCounter, setQuestionCounter] = useState(1);
  const [saving, setSaving] = useState(false)
  const [questionDetails, setQuestionDetails] = useState([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([""]);
  const [answer, setAnswer] = useState("");
  const [type, setType] = useState("");
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [files, setFiles] = useState(null);
  const [text, setText] = useState("");
  const token = localStorage.getItem("auth-token");

  const [uploadError, setUploadError] = useState("");
  const [editQuestions, setEditQuestions] = useState(false);
  const [groupedQuestions, setGroupedQuestions] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(5);
  const [extracted, setExtracted] = useState(false);
  const [upload, setUpload] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [activeTab, setActiveTab] = useState("practice");

  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;

  useEffect(() => {
    setAllQuestions(localStorage.getItem("questions") || []);
    axios
      .get("https://ncs-cbt-api.onrender.com/exam/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setQuestions(res.data.data || []);
        setDisplayedQuestions(questions);
        const questionsForSelectedCategory = questions.filter(
          (question) => question.category === selectedCategory
        );
        setEditQuestions(questionsForSelectedCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptionsArray = [...options];
    newOptionsArray[index] = value;
    setOptions(newOptionsArray);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const addOption = (index) => {
    const newQuestions = [...groupedQuestions];
    newQuestions[index].options.push("");
    setGroupedQuestions(newQuestions);
  };

  const handleRemoveOption = (index) => {
    const newOptionsArray = [...options];
    newOptionsArray.splice(index, 1);
    setOptions(newOptionsArray);
  };

  const handleAddQuestion = () => {
    if (category === "" || question === "" || answer === "" || options === "") {
      setUploadError("Input valid values!");
    } else {
      const newQuestionObj = {
        question: question,
        answer: answer,
        options: options,
        type: type,
        category: category,
      };
      setQuestionDetails([...questionDetails, newQuestionObj]);
      setQuestion("");
      setAnswer("");
      setOptions([""]);
    }
  };

  const updateQuestions = async () => {
    try {
      const response = await axios.get(
        "https://ncs-cbt-api.onrender.com/exam/",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      setQuestions(response.data.data || []);
      console.log(questions)
      setDisplayedQuestions(questions);
      const questionsForSelectedCategory = questions.filter(
        (question) => question.category === selectedCategory
      );
      setEditQuestions(questionsForSelectedCategory);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveQuestions = async () => {
    if (
      questionCategory === "" ||
      questionDetails.some((question) => question.text === "")
    ) {
      alert("Please fill in all the required fields");
      return;
    } else {
      const questionData = {
        questionDetails
      };
      console.log(questionDetails)
      localStorage.setItem("questions", JSON.stringify(questionData));
      try {
        const response = await axios.post(
          "https://ncs-cbt-api.onrender.com/exam/uploadMultiple",
          questionData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        updateQuestions();
        setQuestionDetails([]);
      } catch (err) {
        if (!err?.response) {
          console.log(err);
          console.log(err.message);
        } else if (err.response?.status === 409) {
          setUploadError(err.response.data.message);
        } else {
          setUploadError("Upload Failed");
        }
      }
    }
  };

  const uploadFile = () => {
    setUpload(true);
  };

  const extractText = (event) => {
    const file = event.target.files[0];
    setFiles(file);
    pdfToText(file)
      .then((text) => {
        setText(text);
        console.log(text, "Text extracted from pdf");
      })
      .catch((error) => console.log(error, "Failed to extract text from pdf"));
  };

  const extractQuestionsAnswers = (text) => {
    setUpload(false);
    setExtracted(true);
    // Regex to extract questions, excluding "TRUE or FALSE"
    const questionRegex =
      /(\d+\.\s+(?!.*\bTRUE\sor\sFALSE\b).*?)(?=(?:\d+\.\s|$))/gs;
    // Regex to extract options (A., B., C., D., etc.), excluding "TRUE", "FALSE", "YES", "NO"
    // const optionRegex = /([A-Z]\.\s.*?)(?=\s[A-Z]\.|TRUE|FALSE|YES|NO|(?=\d+\.\s)|$)/gs;
    const optionRegex =
      /([A-Za-z]\.\s.*?)(?=\s[A-Za-z]\.|TRUE|FALSE|YES|NO|(?=\d+\.\s)|$)/gs;

    const questions = text.match(questionRegex) || [];
    const options = text.match(optionRegex) || [];

    // Initialize an array to hold grouped questions and options
    const groupedQuestions = [];

    // Iterate through each question to find matching options
    questions.forEach((question) => {
      // Filter options that belong to the current question
      const matchedOptions = options.filter((option) =>
        question.includes(option)
      );

      // Ensure unique options by creating a Set and converting it back to array
      const uniqueOptions = [...new Set(matchedOptions)];

      // Create a grouped object with question and unique options
      const groupedQuestion = {
        question: question.trim(), // Trim to remove extra whitespace
        options: uniqueOptions.map((option) => option.trim()),
        answer, category, type// Trim each option
      };

      // Add the grouped question to the array
      groupedQuestions.push(groupedQuestion);
    });

    setGroupedQuestions(groupedQuestions);
    console.log("Grouped Questions and Options:", groupedQuestions);
  };

  const showMoreQuestions = () => {
    setQuestionsToShow((prev) => prev + 5);
    console.log(questionsToShow);
  };

  const saveQuestions = async () => {
    console.log("Saving Questions", groupedQuestions);
    console.log(category, type);
      if (
        category === "" ||
       type === "") {
        setUploadError("Please fill in all the required fields");
        return;
      } else {
    // console.log(questionDetails, "questionDetails")
    setQuestionDetails(groupedQuestions);
    console.log(questionDetails, "questionDetails")
        const questionData = {
          questionDetails
        };
        localStorage.setItem("questions", JSON.stringify(questionData));
        try {
          setSaving(true)
          const response = await axios.post(
            "https://ncs-cbt-api.onrender.com/exam/uploadMultiple",
            questionData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response)
          updateQuestions();
          setQuestionDetails([]);
          setSaving(false)
        } catch (err) {
          setSaving(false)
          if (!err?.response) {
            console.log(err);
            console.log(err.message);
          } else if (err.response?.status === 409) {
            setUploadError(err.response.data.message);
          } else {
            setUploadError("Uplaod Failed");
          }
        }
      }
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = groupedQuestions.filter((_, i) => i !== index);
    setGroupedQuestions(newQuestions);
  };

  const deleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...groupedQuestions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setGroupedQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newQuestion = {
      question: "New question",
      options: ["A. Option 1", "B. Option 2", "C. Option 3", "D. Option 4"],
    };
    setGroupedQuestions([...groupedQuestions, newQuestion]);
  };
  
  const handleQuestionChange = (index, event) => {
    const newQuestions = [...groupedQuestions];
    newQuestions[index].question = event.target.value;
    setGroupedQuestions(newQuestions);
  };

  const handleChangeOption = (questionIndex, optionIndex, event) => {
    const newQuestions = [...groupedQuestions];
    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setGroupedQuestions(newQuestions);
  };


  return (
    <div className="flex flex-col w-full p-8 md:p-10">
      <Header title="Upload Questions" />
      <div className="flex justify-between">
        <div
          className="my-4 cursor-pointer text-primary mx-4"
          onClick={() => window.history.back()}
        >
          Back
        </div>
        {/* hide button during file upload */}
        {!upload && !extracted && (
          <Button
            title="Select File to Upload"
            btnStyles="px-4 py-3 text-white bg-primary rounded-md"
            btnClick={uploadFile}
          />
        )}
      </div>
      {uploadError && (
        <div className="text-red-500 font-bold text-xl">{uploadError}</div>
      )}
      <div className="flex flex-col gap-8 px-4 mt-6">
        <div className="flex items-center gap-6 w-full">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="questionCategory" className="text-lg">
              Question Category
            </label>
            <select
              id="questionCategory"
              value={category}
              onChange={(event) => {
                setUploadError("");
                setCategory(event.target.value);
              }}
              className={`border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary bg-gray-200 border-primary`}
            >
              <option value="" className="px-4 py-3 text-primary text-lg">
                Select a category
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="px-4 py-3 text-primary text-lg"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label className="text-lg">Question Type:</label>
            <div className="flex gap-4">
              <label className="w-full">
                <input
                  type="radio"
                  value="exam"
                  checked={type === "exam"}
                  onChange={(e) => setType(e.target.value)}
                  className="mx-3"
                />
                Exam
              </label>
              <label className="w-full">
                <input
                  type="radio"
                  value="practice"
                  checked={type === "practice"}
                  onChange={(e) => setType(e.target.value)}
                  className="mx-3"
                />
                Practice
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* hide formfield for manual upload */}
      {!extracted && !upload && (
        <div className="p-4 my-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-lg">Question</div>
              <textarea
                value={question}
                onChange={(e) => {
                  setUploadError("");
                  setQuestion(e.target.value.trim());
                }}
                rows={3}
                className="border py-4 px-4 rounded-lg shadow-md text-sm hover:border-primary w-full bg-gray-200 border-primary"
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <label className="text-lg" htmlFor="answer">
                Answer:
              </label>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  value={answer}
                  className="border py-4 px-4 rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary"
                  onChange={(e) => setAnswer(e.target.value.trim())}
                />
              </div>
            </div>
            <label className="text-lg">Options:</label>
            <div className="grid grid-cols-2 gap-6 w-full">
              {options.map((option, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <span>{String.fromCharCode(65 + index)}</span>
                  <input
                    type="text"
                    id={`option-${index}`}
                    value={option}
                    onChange={(e) => {
                      setUploadError("");
                      handleOptionChange(index, e.target.value.trim());
                      selectedAnswer && setAnswer(option);
                    }}
                    className="border border-primary rounded-md bg-gray-200 py-2 px-4 flex-grow mr-2"
                  />
                  <Button
                    title={<img src={del} alt="delete" className="" />}
                    btnStyles="rounded-md"
                    btnClick={() => handleRemoveOption(index)}
                  />
                </div>
              ))}
              <Button
                title={
                  <div className="flex gap-2 text-white">
                    <img src={add} alt="" />
                    <div>Add Option</div>
                  </div>
                }
                btnStyles="px-4 py-3 bg-cardgreen rounded-md"
                btnClick={handleAddOption}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-4 my-10">
            <div
              className="text-xl flex gap-4 items-center w-1/3 cursor-pointer"
              onClick={handleAddQuestion}
            >
              <img src={add} alt="add more questions" />
              <div>Add More</div>
            </div>
          </div>
        </div>
      )}
      {/* show form field for file upload */}
      {upload && (
        <div className="p-4 flex space-x-6 my-6">
          <div className="flex flex-col w-1/2 gap-2">
            <label htmlFor="upload" className="text-lg">
              {" "}
              Select file for upload
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={extractText}
              className="p-8 border rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary"
            />
          </div>
          <div className="w-1/2 flex flex-col items-end justify-end">
            <Button
              title="Upload"
              btnStyles="px-4 py-3 text-white bg-primary rounded-md w-full"
              btnClick={() => extractQuestionsAnswers(text)}
            />
          </div>
        </div>
      )}
      {/* when question is extracted, show here */}
      {extracted && (
        <>
        <div className="text-lg mt-6 px-4">Extracted Questions</div>
          <div className="h-[100vh] overflow-auto px-6 pt-6 mx-4 my-4 opacity-85 border rounded-lg shadow-sm text-sm hover:border-primary w-full bg-gray-200 border-primary flex flex-col gap-6">
            {groupedQuestions
              .slice(0, questionsToShow)
              .map((group, questionIndex) => (
                <div key={questionIndex} className="mb-6 flex flex-col gap-4">
                  {/* <div>Question {questionIndex + 1}</div> */}
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={group.question}
                      onChange={(e) => handleQuestionChange(questionIndex, e)}
                      className="border py-4 px-4 rounded-lg shadow-md text-sm hover:border-primary bg-white w-2/3"
                    />
                    <div>
                    <Button btnClick={() => handleDeleteQuestion(questionIndex)} title={<img src={del} alt="delete" />} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                  {group.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-4">
                      <input
                        type="text"
                        value={option}
                        onChange={(event) =>
                          handleChangeOption(questionIndex, optionIndex, event)
                        }
                        placeholder="Enter option"
                        className="border py-3 px-4 rounded-lg shadow-md text-sm hover:border-primary bg-white"
                      />
                        <Button btnClick={() => deleteOption(questionIndex,optionIndex)} title={<img src={del} alt="delete" />} />
                    </div>
                  ))}
                    <Button btnClick={() => addOption(questionIndex)} title="Add Option" btnStyles="px-4 py-3 w-fit text-xs bg-primary text-white rounded-md" />
                  </div>
                  <div className="flex flex-col gap-2">
                      <label htmlFor="answer">
                        Answer
                      </label>
                      <input
                        type="text"
                        value={group.answer}
                        placeholder="Enter answer"
                        className="border py-3 px-4 rounded-lg shadow-md text-sm hover:border-primary bg-white"
                      />
                    </div>
                </div>
              ))}
          </div>
          {groupedQuestions.length > 0 && (
            <>
              <div className="px-4 flex justify-between">
                {questionsToShow < groupedQuestions.length && (
                  <>
                  <Button btnClick={showMoreQuestions} title="Show More" btnStyles="px-4 py-3 bg-primary text-white rounded-md" />
                <Button btnClick={saveQuestions} title={saving === true ? "Saving" :"Save Questions"} btnStyles="px-4 py-3 bg-primary text-white rounded-md" />
                  </>
                )}
              </div>

              <div className="flex gap-2 justify-between px-4 py-3">
                {questionsToShow >= groupedQuestions.length - 1 && (
                  <div
                  className="text-xl flex gap-4 items-center w-1/3 cursor-pointer"
                  onClick={addQuestion}
                >
                  <img src={add} alt="add more questions" />
                  <div>Add More</div>
                </div>
                )}
                {questionsToShow >= groupedQuestions.length && (
                <Button btnClick={saveQuestions} title={saving === true ? "Saving" :"Save Questions"} btnStyles="px-4 py-3 bg-primary text-white rounded-md" />
                )}
              </div>
            </>
          )}
        </>
      )}
      {!upload && !extracted && questionDetails.length > 0 ? (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Questions</h2>
          {questionDetails.map((question, index) => (
            <div key={index} className="mb-4 flex flex-col gap-4">
              <h3 className="text-lg font-bold">
                Question {index + 1}: {question.question}
              </h3>
              <p>
                Answer: <span className="font-semibold">{question.answer}</span>
              </p>
              <div className="flex flex-col">
                {question.options.map((option, i) => (
                  <div key={i} className="ml-2">
                    {String.fromCharCode(65 + i)}. {option}
                  </div>
                ))}
              </div>
              <hr className="mt-6" />
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              title="Save Questions"
              btnStyles="px-4 py-3 text-white bg-primary rounded-md w-1/3"
              btnClick={handleSaveQuestions}
            />
          </div>
        </div>
      ) : (
      !upload && (<div>No questions added yet</div>)
      )}
    </div>
  );
};
