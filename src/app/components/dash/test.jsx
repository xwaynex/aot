"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Popover } from '@mui/material';
import { TableQuestions, selectCategory } from '@/store/slice/faqSlice';

const Faq = () => {
  const selectedCategory = useSelector((state) => state.tableData.currentCategory);
  const dispatch = useDispatch();

  const categories = [
    { id: TableQuestions.CATEGORY_ONE, name: 'what is aot logistics' },
    { id: TableQuestions.CATEGORY_TWO, name: 'how many days is it' },
    { id: TableQuestions.CATEGORY_THREE, name: 'lol' },
    { id: TableQuestions.CATEGORY_FOUR, name: 'you know what' },
    { id: TableQuestions.CATEGORY_FIVE, name: 'FIVE' },
  ];

  const questionsByCategory = {
    [TableQuestions.CATEGORY_ONE]: {
      questions: ['Question 1', 'Question 2', 'Question 3'],
      loremIpsum: ['Lorem Ipsum 1', 'Lorem Ipsum 2', 'Lorem Ipsum 3'],
    },
    [TableQuestions.CATEGORY_TWO]: {
      questions: ['Question 4', 'Question 5'],
      loremIpsum: ['Lorem Ipsum 4', 'Lorem Ipsum 5'],
    },
    [TableQuestions.CATEGORY_THREE]: {
      questions: ['Question 6', 'Question 7', 'Question 8'],
      loremIpsum: ['Lorem Ipsum 6', 'Lorem Ipsum 7', 'Lorem Ipsum 8'],
    },
    [TableQuestions.CATEGORY_FOUR]: {
      questions: ['Question 9', 'Question 10'],
      loremIpsum: ['Lorem Ipsum 9', 'Lorem Ipsum 10'],
    },
    [TableQuestions.CATEGORY_FIVE]: {
      questions: ['Question 11', 'Question 12', 'Question 13', 'Question 14'],
      loremIpsum: ['Lorem Ipsum 11', 'Lorem Ipsum 12', 'Lorem Ipsum 13', 'Lorem Ipsum 14'],
    },
  };

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category));
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

 

  return (
    <div>
    <table>
    <thead>
    <tr>
    <th>S/N</th>
    <th>categories</th>
    <th>Question</th>
    </tr>
    </thead>

    <tbody>
    <tr>
    <td className='text-black'>
    {categories.map((category) => (
        <div>{category.name}<button onClick={() => handleCategoryClick(category.id)}> . </button></div>
      ))}
    </td>
      </tr>
    <tr>
    {categories.map((category) => (
      <td>
    {selectedCategory === category.id &&
        questionsByCategory[category.id].questions.map((question, index) => (
          <div key={index} onClick={() => handleQuestionClick(question)}>
          <h1 className='text-black'><button key={index} onClick={() => handleQuestionClick(question)}>{question}</button></h1>
          </div>
        ))}
        </td>

        ))}
        </tr>
    </tbody>

    </table>
      

      <Popover
        open={!!selectedQuestion}
        anchorEl={selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '1rem' }}>
          <h2>{selectedQuestion}</h2>
          <p>{questionsByCategory[selectedCategory].loremIpsum[selectedQuestion]}</p>
        </div>
      </Popover>
    </div>
  );
};

export default Faq;
