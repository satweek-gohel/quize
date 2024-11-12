import React from 'react';
import '../styles/Option.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Options({ options, isCorrect }) {
  return (
    <div className="option-container p-3 rounded d-flex justify-content-space-between">
      {options}
      <div className='mx-3'>
        {isCorrect === true && <FaCheckCircle className="icon correct-icon" color='green' />}
        {isCorrect === false && <FaTimesCircle className="icon wrong-icon" color='red' />}
      </div>
    </div>
  );
}

export default Options;