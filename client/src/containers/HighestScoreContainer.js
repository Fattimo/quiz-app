import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

const LOCALSTORAGE_KEY = 'HIGHEST_SCORES';

const useHighestScoresContainer = () => {
  const [highestScores, setHighestScores] = useState({});

  useEffect(() => {
    setHighestScores(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(highestScores));
  }, [highestScores]);

  const getHighestScore = quizId => {
    return highestScores[quizId];
  };

  const saveScore = (quizId, score) => {
    const old = highestScores[quizId]
    setHighestScores({
      ...highestScores,
      [quizId]: old ? Math.max(score, old) : score
    });
  };

  // const removeSavedScore = quizId => {
  //   const { [quizId]: omit, ...scores } = highestScores;
  //   setHighestScores(scores);
  // };

  return {
    highestScores,
    getHighestScore,
    saveScore
  };
};

const HighestScoreContainer = createContainer(useHighestScoresContainer);

export default HighestScoreContainer;