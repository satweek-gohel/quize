import React from 'react';
import '../styles/Counts.css'; 

function Counts({ count, currentQuestionIndex }) {
  const isQuizFinished = currentQuestionIndex >= count;

  return (
    <div className="counts-container">
      {isQuizFinished ? (
        <div className="result-message">Quiz Finished!</div>
      ) : (
        <>
          {Array.from({ length: count }).map((_, index) => (
            <div 
              key={index} 
              className="count-circle" 
              style={{ background: index === currentQuestionIndex ? 'linear-gradient(#E65895, #BC6BE8)' : '#8B8EAB' }}
            >
              {index + 1}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Counts;
