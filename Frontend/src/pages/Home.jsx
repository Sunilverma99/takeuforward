import React, { useState, useEffect } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Table, Modal } from 'flowbite-react'; // Assuming you have a Table component
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import FlashCard from '../components/FlashCard';

function Home() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(9); // Number of flashcards per page
  const [deletedCard_id, setDeletedCard_id] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashCard/getAll');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (questions.length === 0) {
      getQuestions();
    }
  }, [questions]);

  const handleDeleteFlashCard = async () => {
    if(currentUser && currentUser.isAdmin){
      try {
        const response = await fetch(`http://localhost:5000/api/flashCard/delete/${deletedCard_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        toast.success('Flashcard deleted successfully');
        navigate('/');
      } catch (error) {
        console.error('Error deleting flashcard:', error);
        toast.error('An error occurred. Please try again.');
      }
    } else {
      toast.error('You are not authorized to delete this post');
    }
  };

  // Calculate the index of the first and last question for the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  if (currentUser && currentUser.isAdmin) {
    return (
      <div>
        <div className='flex flex-wrap gap-8 py-2 justify-center'>
        {currentQuestions && currentQuestions.slice(0, 9).map((question, index) => (
            <FlashCard 
              key={index} 
              question={question.question} 
              answer={question.answer} 
              category={question.category} 
              tags={question.tags} 
            />
          ))}
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Question Number</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3 text-green-400">Edit</th>
                <th scope="col" className="px-6 py-3 text-red-600">Delete</th>
                <th scope="col" className="px-6 py-3">Visit</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map((question, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {(currentPage-1)*9 + index+1}
                  </th>
                  <td className="px-6 py-4">{question.question}</td>
                  <td className="px-6 py-4">{question.category}</td>
                  <td className="px-6 py-4 text-green-500">
                    <Link to={`/question/update/${question._id}`}>Edit</Link>
                  </td>
                  <td className="px-6 py-4 text-red-500">
                    <button onClick={() => {
                      setDeletedCard_id(question._id);
                      setShowModel(true);
                    }}>Delete</button>
                  </td>
                  <td className="px-6 py-4 text-blue-500">
                    <Link to={`question/${question._id}`}>Visit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {showModel &&
          <Modal
            show={showModel}
            onClose={() => setShowModel(false)}
            popup
            size='md'
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center bg-white'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button className='bg-red-600' onClick={handleDeleteFlashCard}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' className='bg-gray-300' onClick={() => setShowModel(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        }
      </div>
    );
  } else {
    return (
      <div>
        <div className='flex flex-wrap gap-8 py-2 justify-center'>
          {currentQuestions && currentQuestions.slice(0, 9).map((question, index) => (
            <FlashCard 
              key={index} 
              question={question.question} 
              answer={question.answer} 
              category={question.category} 
              tags={question.tags} 
            />
          ))}
        </div>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Question Number</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Visit</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map((question, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {(currentPage-1)*9 + index+1}
                  </th>
                  <td className="px-6 py-4">{question.question}</td>
                  <td className="px-6 py-4">{question.category}</td>
                  <td className="px-6 py-4 text-blue-500">
                    <Link to={`question/${question._id}`}>Visit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
