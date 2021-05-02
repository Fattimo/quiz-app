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

  const isSaved = documentId => {
    return !!highestScores[documentId];
  };

  const saveScore = (quizId, score) => {
    setHighestScores({
      ...highestScores,
      [quizId]: score
    });
  };

  const removeSavedScore = documentId => {
    const { [documentId]: omit, ...scores } = highestScores;
    setHighestScores(scores);
  };


  return {
    highestScores,
    isSaved,
    saveScore
  };
};

const HighestScoreContainer = createContainer(useHighestScoresContainer);

export default HighestScoreContainer;