import React from 'react'
import FlashCard from '../components/FlashCard'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Card() {
  const {id } = useParams();
  const [question, setQuestion] = useState(null);
 
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/flashCard/${id}`);
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getQuestion();
  }, [id]);

if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <FlashCard 
    question={question.question} 
    answer={question.answer} 
    category={question.category} 
    tags={question.tags} />
  )
}

export default Card