import React, { useEffect, useState } from 'react';
import Counts from './Counts';
import '../styles/Box.css';
import axios from 'axios';
import Options from './Options';
import Modal from 'react-modal';

function Box() {
    const [question, setQuestion] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getQuestions = async () => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=40&category=22&difficulty=medium&type=multiple');
            setQuestion(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []); 

    useEffect(() => {
        if (question.length > 0) {
            const currentQuestion = question[currentQuestionIndex];
            const allOptions = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
            setOptions(shuffleArray(allOptions));
            setSelectedOption(null); 
            setIsCorrect(null); 
        }
    }, [question, currentQuestionIndex]);

    useEffect(() => {
        if (currentQuestionIndex >= 10) {
            setIsModalOpen(true);
        }
    }, [currentQuestionIndex]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        const correct = option === question[currentQuestionIndex].correct_answer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prevScore => prevScore + 1);
        }
        setTimeout(() => {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }, 1000);
    };

    const handlePlayAgain = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setIsModalOpen(false);
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="parent d-flex justify-content-center align-items-center">
            <div className="box-container rounded text-light p-3 d-flex flex-column justify-content-center align-items-center">
                <h4 className='title text-secondary text-center'>Country Quiz</h4>
                <Counts count={10} currentQuestionIndex={currentQuestionIndex} />
                <h4 className='text-center mt-3'>{question[currentQuestionIndex]?.question}</h4>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-center">
                        {options.slice(0, 2).map((option, index) => (
                            <div className="mt-2 d-flex flex-column align-items-center mx-2" key={index} onClick={() => handleOptionClick(option)}>
                                <Options options={option} isCorrect={selectedOption === option ? isCorrect : null} />
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        {options.slice(2, 4).map((option, index) => (
                            <div className="mt-2 d-flex flex-column align-items-center mx-2" key={index + 2} onClick={() => handleOptionClick(option)}>
                                <Options options={option} isCorrect={selectedOption === option ? isCorrect : null} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Quiz Finished"> 
                <img src="https://img.freepik.com/premium-vector/party-popper-cartoon-colored-clipart-illustration_576561-5309.jpg?semt=ais_hybrid" alt="" height={50} width={50} />
                <h2>Congratulations!</h2>
                <p>Your score: {score} out of 10</p>
                <button className='btn btn-primary' onClick={handlePlayAgain}>Play Again</button>
            </Modal>
        </div>
    );
}

export default Box;