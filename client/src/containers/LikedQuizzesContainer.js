import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

const LOCALSTORAGE_KEY = 'LIKED_QUIZZES';

const useLikedQuizzesContainer = () => {
  const [likedQuizzes, setLikedQuizzes] = useState({});

  useEffect(() => {
    setLikedQuizzes(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {});
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(likedQuizzes));
  }, [likedQuizzes]);

  const isSaved = documentId => {
    return !!likedQuizzes[documentId];
  };

  const likeQuiz = product => {
    setLikedQuizzes({
      ...likedQuizzes,
      [product._id]: product
    });
  };

  const removelikedQuiz = documentId => {
    const { [documentId]: omit, ...quizzes } = likedQuizzes;
    setLikedQuizzes(quizzes);
  };

  const toggleQuizLike = quiz => {
    if (isSaved(quiz.id)) {
      removelikedQuiz(quiz.id);
    } else {
      likeQuiz(quiz);
    }
  };

  return {
    likedQuizzes,
    isSaved,
    toggleQuizLike
  };
};

const LikedQuizzesContainer = createContainer(useLikedQuizzesContainer);

export default LikedQuizzesContainer;