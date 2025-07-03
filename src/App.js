import React, { useState } from 'react';
import './App.css';

function App() {
  const [adviceId, setAdviceId] = useState('');
  const [adviceText, setAdviceText] = useState('Click the button to get an affirmation!');
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = "https://api.adviceslip.com/advice";

  const fetchAdvice = () => {
    setIsLoading(true);
    fetch(apiUrl, { cache: "no-cache" })
      .then((response) => response.json())
      .then((response) => {
        let data = response.slip;
        let dataId = data.id;
        let dataAdvice = data.advice;
        
        setAdviceId(dataId);
        setAdviceText(dataAdvice);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching advice:', error);
        setAdviceText('Sorry, could not fetch advice. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="advice-container">
        <div className="advice-number">
          {adviceId && `Affirmation #${adviceId}`}
        </div>
        <div className="quotes">
          {isLoading ? 'Loading...' : adviceText}
        </div>
        <div className="button-section" onClick={fetchAdvice}>
          <button disabled={isLoading}>
            Get New Affirmation
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;