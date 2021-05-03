import { useState, useEffect, useRef } from 'react';
import { createContainer } from 'unstated-next';

const LOCALSTORAGE_KEY = 'LIKED_QUIZZES';
const UNIQUE_ID_KEY = "UNIQUE_ID"

const useLikedQuizzesContainer = () => {
  const [likedQuizzes, setLikedQuizzes] = useState({});
  const uniqueId = useRef("")

  useEffect(() => {
    setLikedQuizzes(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {});
    uniqueId.current = localStorage.getItem(UNIQUE_ID_KEY)
    if (!uniqueId.current) {
      uniqueId.current = require('uniqid')()
      localStorage.setItem(UNIQUE_ID_KEY, uniqueId.current)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(likedQuizzes));
  }, [likedQuizzes]);

  const isLiked = documentId => {
    return !!likedQuizzes[documentId];
  };

  const likeQuiz = quiz => {
    setLikedQuizzes({
      ...likedQuizzes,
      [quiz.id]: quiz
    });
  };

  const removeLikedQuiz = documentId => {
    const { [documentId]: omit, ...quizzes } = likedQuizzes;
    setLikedQuizzes(quizzes);
  };

  const toggleQuizLike = quiz => {
    if (isLiked(quiz.id)) {
      removeLikedQuiz(quiz.id);
    } else {
      likeQuiz(quiz);
    }
  };

  return {
    likedQuizzes,
    isLiked,
    toggleQuizLike,
    removeLikedQuiz
  };
};

const LikedQuizzesContainer = createContainer(useLikedQuizzesContainer);

export default LikedQuizzesContainer;