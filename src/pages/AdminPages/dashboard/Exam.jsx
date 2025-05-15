import React, { useState } from 'react'
import { Header } from '../../../components/shared/Header'
import { Table } from '../../../components/shared/Table'
import { Button } from '../../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import del from '../../../assets/delete.png';
import view from '../../../assets/open.png';
import { useUserStore } from '../../../store/userStore';


export const Exam = () => {
  const navigate = useNavigate();
  const {questions} = useUserStore();

  const showQuestions = (questionCategory) => {
    navigate('../view-question', { state: { selectedCategory: questionCategory } });
  };

  const tableData = [
    {
      id: 1,
      questionCategory: "CAI-CAII"
    },
    {
      id: 2,
      questionCategory: "CAII-AIC"
    },
    {
      id: 3,
      questionCategory: "AIC-IC"
    },
    {
      id: 4,
      questionCategory: "IC-ASCII"
    },
    {
      id: 5,
      questionCategory: "ASCII-ASCI"
    },
    {
      id: 6,
      questionCategory: "ASCI-DSC"
    },
    {
      id: 7,
      questionCategory: "DSC-SC"
    },
    {
      id: 8,
      questionCategory: "SC-CSC"
    },
    {
      id: 9,
      questionCategory: "CSC-AC"
    },
    {
      id: 10,
      questionCategory: "AC-DC"
    },
    {
      id: 11,
      questionCategory: "DC-CC"
    }
  ];
  
  return (
    <div className='p-8 md:p-10'>
      <Header title="Exam/Practice" />
      <div className='w-full flex justify-end py-4'>
        <Button title="Upload Questions" btnStyles="px-4 py-3 rounded-md bg-primary text-white" btnClick={() => navigate("../upload-question")} />
      </div>
      <div className='text-2xl md:text-3xl font-light'>Question Categories</div>
        {tableData.map((item, index) => (
          <div key={item.questionCategory} className='my-2'>
            <div className='flex justify-between items-center hover:bg-primary hover:text-white px-4 py-3 md:w-1/2'>
              <div>{index + 1}</div>
              <div className='text-md md:text-lg'>{item.questionCategory}</div>
              <div className='flex justify-between gap-4 hover:textwhite'>
                <Button title={<img src={view} alt='delete' className='w-7 h-7' />} btnStyles="text-primary bg-secondary px-4 py-2 rounded-md shadow-md"
                  btnClick={() => showQuestions(item.questionCategory)} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
