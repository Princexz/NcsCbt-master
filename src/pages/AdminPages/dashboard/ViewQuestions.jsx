import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/shared/Button';
import { useLocation } from 'react-router-dom';
import { Header } from '../../../components/shared/Header';
import { useUserStore } from '../../../store/userStore';
import axios from 'axios';
import { Modal } from '../../../components/shared/Modal';
import del from '../../../assets/delete.png';

export const ViewQuestion = () => {
    const { questions, setQuestions } = useUserStore();
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const [editedQuestions, setEditedQuestions] = useState([]);
    const [isEditing, setIsEditing] =
        useState(false);
    const [activeTab, setActiveTab] = useState('practice');
    const [selectedCategoryData, setSelectedCategoryData] = useState([]);
    const location = useLocation();
    const selectedCategory = location.state?.selectedCategory;
    const token = localStorage.getItem("auth-token");

    useEffect(() => {
        const questionsForSelectedCategory = questions.filter(
            (question) => question.category === selectedCategory
        );
        setDisplayedQuestions(questionsForSelectedCategory);
        updateQuestions();
    }, [selectedCategory]);

    const updateQuestions = async () => {
        axios
            .get(
                "https://ncs-cbt-api.onrender.com/exam/",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                setQuestions(res.data.data || []);
                const questionsForSelectedCategory =
                    questions.filter(
                        (question) =>
                            question.category === selectedCategory
                    );
                setDisplayedQuestions(questionsForSelectedCategory);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteQuestion = async (id) => {
        const updatedQuestions = displayedQuestions.filter((question) => question._id !== id);
        setDisplayedQuestions(updatedQuestions)
        try {
            const response = await axios.post(
                "https://ncs-cbt-api.onrender.com/exam/delete",
                { id },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            updateQuestions();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        const questionsForSelectedCategory =
            displayedQuestions.filter(
                (item) => item.category === category
            );

        if (questionsForSelectedCategory) {
            setSelectedCategoryData(questionsForSelectedCategory[0]);
        } else {
            console.error(
                "No questions found for the selected category."
            );
        }

        // Update the form data with the stored data
        const storedQuestions =
            questionsForSelectedCategory?.questions || [];
        setEditedQuestions(storedQuestions);
    };

    const handleEditOptionChange = (index, value) => {
        const editedOptions = []
    }
    const handleSaveEditedQuestions = () => {
        const allQuestions =
            JSON.parse(
                localStorage.getItem("questions")
            ) || [];
        const updatedQuestions = allQuestions.map(
            (item) => {
                if (
                    item.category ===
                    selectedCategoryData.category
                ) {
                    return {
                        ...item,
                        questions: editedQuestions,
                    };
                }
                return item;
            }
        );

        localStorage.setItem(
            "questions",
            JSON.stringify(updatedQuestions)
        );
        setDisplayedQuestions(updatedQuestions);
        setIsEditing(false);
        setSelectedCategoryData(null);
        setEditedQuestions([]);
    };

    return (
        <div className='px-8'>
            <Header title="View Questions" />
            <div className="px-4">
                <div className='flex font-semibold text-lg text-center w-full mt-10'>
                    <div
                        className={`${activeTab === "practice"
                            ? "bg-primary text-white border border-t-primary border-x-primary"
                            : ""
                            } px-4 py-3 rounded-tl-md cursor-pointer w-full`}
                        onClick={() => setActiveTab("practice")}>
                        Practice
                    </div>
                    <div
                        className={`${activeTab === "exam"
                            ? "bg-primary text-white border border-t-primary border-x-primary"
                            : ""
                            } px-4 py-3 rounded-tr-md cursor-pointer w-full`}
                        onClick={() => setActiveTab("exam")}>
                        Exam
                    </div>
                </div>
                <hr className='border border-primary mb-6' />
                <div className='text-2xl font-semibold text-center'>{selectedCategory}</div>
                {displayedQuestions.map((question, index) => (
                    <>
                    {activeTab === "practice" &&
                            question.type === "" && (
                                <div
                                    key={question.id}
                                    className='my-10'>
                                    <div className='flex flex-col gap-4 mb-10'>
                                        <div className='flex gap-4 font-bold text-lg'>
                                            <div className=''>
                                                {index + 1}.
                                            </div>
                                            <div>{question.question}</div>
                                        </div>
                                        <div className="flex md:flex-row flex-col justify-between">
                                            <div className='flex flex-col gap-4'>
                                                {question.options === "" ? (
                                                    <div>No options added yet</div>
                                                ) : (
                                                    <div className=''>
                                                        {question.options.map((option, i) => (
                                                            <div key={i} className="flex items-center">
                                                                <span>{String.fromCharCode(65 + i)}. {option}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className=''>
                                                <Button
                                                    title={
                                                    <img src={del} alt="delete" />
                                                    }
                                                    btnStyles='px-4 py-3 text-white bg-yellow rounded-md my-4 w-full'
                                                    btnClick={() => {
                                                        deleteQuestion(question._id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='flex gap-4 w-1/2'> */}
                                    {/* <Button
                                            title='Edit'
                                            btnStyles='px-4 py-3 text-white bg-primary rounded-md my-4 w-full'
                                            btnClick={() => {
                                                handleEdit(question.category);
                                            }}
                                        /> */}
                                    {/* </div> */}
                                </div>
                            )}
                        {activeTab === "practice" &&
                            question.type === "practice" && (
                                <div
                                    key={question.id}
                                    className='my-10'>
                                    <div className='flex flex-col gap-4 mb-10'>
                                        <div className='flex gap-4 font-bold text-lg'>
                                            <div className=''>
                                                {index + 1}.
                                            </div>
                                            <div>{question.question}</div>
                                        </div>
                                        <div className="flex md:flex-row flex-col justify-between">
                                            <div className='flex flex-col gap-4'>
                                                {question.options === "" ? (
                                                    <div>No options added yet</div>
                                                ) : (
                                                    <div className=''>
                                                        {question.options.map((option, i) => (
                                                            <div key={i} className={`flex items-center ${option === question.answer ? "text-primary font-bold" : ""}`}>
                                                                <span>{String.fromCharCode(65 + i)}. {option}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className=''>
                                                <Button
                                                    title={
                                                    <img src={del} alt="delete" />
                                                    }
                                                    btnStyles='px-4 py-3 text-white md:bg-yellow rounded-md my-4 w-full'
                                                    btnClick={() => {
                                                        deleteQuestion(question._id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        {activeTab === "exam" &&
                            question.type === "exam" && (
                                <div
                                    key={question.id}
                                    className='my-10 flex'>
                                    <div className='flex flex-col gap-4 mb-10'>
                                        <div className='flex gap-4 font-bold text-lg'>
                                            <div className=''>
                                                {index + 1}.
                                            </div>
                                            <div>{question.question}</div>
                                        </div>
                                        <div className="flex md:flex-row flex-col justify-between">
                                            <div className='flex flex-col gap-4'>
                                                {question.options === "" ? (
                                                    <div>No options added yet</div>
                                                ) : (
                                                    <div className=''>
                                                        {question.options.map((option, i) => (
                                                            <div key={i} className={`flex items-center ${option === question.answer ? "text-primary font-bold" : ""}`}>
                                                                <span>{String.fromCharCode(65 + i)}. {option}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className=''>
                                                <Button
                                                    title={
                                                    <img src={del} alt="delete" />
                                                    }
                                                    btnStyles='px-4 py-3 text-white md:bg-yellow rounded-md my-4 w-full'
                                                    btnClick={() => {
                                                        console.log(question._id);
                                                        deleteQuestion(question._id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </>
                ))}
            </div>
            {isEditing &&
                displayedQuestions &&
                <Modal
                    title={`Edit Questions - ${selectedCategory}`}
                    closeModal={() => {
                        setIsEditing(false);
                        setSelectedCategoryData(null);
                    }}
                    modStyles="w-2/3 bg-secondary h-2/3 overflow-y-scroll"
                    content={
                        <div className='flex flex-col gap-8 my-6'>
                            {displayedQuestions.map((question, index) => (
                                <div key={index} className='flex flex-col gap-6'>
                                    <div className='text-xl font-semibold'>
                                        Question {index + 1}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <div>{question.question}</div>
                                        <div className='flex gap-4 items-center my-6'>
                                            <label htmlFor="answer">
                                                Answer:</label>
                                            <input type="text" value={question.answer} className='px-4 py-3 rounded-md border border-primary bg-gray text-sm' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        {question.options.map((option, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <span>{String.fromCharCode(65 + i)}</span>
                                                <input
                                                    type='text'
                                                    value={option}
                                                    onChange={
                                                        (e) => handleEditOptionChange(index, e.target.value)
                                                    }
                                                    className='px-4 py-3 rounded-md border border-primary bg-gray text-sm'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    buttons={
                        <Button
                            title="Save"
                            btnStyles="px-4 py-3 text-white bg-primary rounded-md"
                            btnClick={handleSaveEditedQuestions}
                        />
                    }
                />
            }
            <div className='flex py-4'>
                <Button title="Close" btnStyles="px-4 py-3 w-1/3 text-white bg-primary rounded-md" btnClick={() => window.history.back()} />
            </div>
        </div>
    );
};