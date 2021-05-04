import axios from 'axios'

/**
 * Quizzes API Calls
 */

export const getPaginatedQuizzes = (limit, page) => {
    const res = axios.get('/api/get/allquizzespaginated', { params: { limit, page } })
    return res
}

export const getQuiz = (quizId) => {
    const res = axios.get('/api/get/quiz', {params: {quiz_id: quizId}})
    return res
}

export const createQuiz = (title, body, difficulty, color, num_questions) => {
    const res = axios.post('/api/post/createquiz', {
            title,
            body,
            difficulty,
            color,
            num_questions
        })
    return res
}

export const updateQuiz = (title, body, difficulty, color, num_questions, quiz_id) => {
    const res = axios.put('/api/put/quiz', {
            title,
            body,
            difficulty,
            color,
            num_questions,
            quiz_id
        })
    return res
}

export const deleteQuizQuestionAnswers = (quiz_id) => {
    const res = axios.delete('/api/delete/quizquestionanswers', { data: {quiz_id} })
    return res
}

export const deleteQuizQuestions = async (quiz_id) => {
    await deleteQuizQuestionAnswers(quiz_id)
    const res = axios.delete('/api/delete/quizquestions', {data: { quiz_id }})
    return res
}

export const deleteQuiz = async (quiz_id) => {
    await deleteQuizQuestions(quiz_id)
    const res = axios.delete('/api/delete/quiz', {data: { quiz_id }})
    return res
}

export const likeQuiz = (quizId, userId) => {
    const res = axios.put('/api/put/likes', {
            uid: userId,
            quiz_id: quizId
        })
    return res
}

/**
 * Question API Calls
 */

export const createQuestion = (body, points, quiz_id) => {
    const res = axios.post('/api/post/createquestion', {
            body,
            points,
            quiz_id
        })

    return res
}

export const updateQuestion = (body, points, quiz_id, question_id) => {
    const res = axios.put('/api/put/question', {
            body,
            points,
            quiz_id,
            question_id
        })
    return res
}

export const deleteQuestionAnswers = (question_id) => {
    const res = axios.delete('/api/delete/questionanswers', {data: { question_id }})
    return res
}

export const deleteQuestion = async (question_id) => {
    await deleteQuestionAnswers(question_id)
    const res = axios.delete('/api/delete/question', { data: { question_id } })
    return res
}

export const getQuizQuestions = (quiz_id) => {
    const res = axios.get('/api/get/allquestions', { params: { quiz_id } })
    return res
}

/**
 * Question Answer API Calls
 */

export const createAnswer = (question_id, body, correct) => {
    const res = axios.post('/api/post/createanswer', {
            body,
            correct,
            question_id
        })
    return res
}

export const updateAnswer = (question_id, body, correct, response_id) => {
    const res = axios.put('/api/put/answer', {
            body, 
            correct,
            question_id, 
            response_id
        })
    return res
}

export const deleteAnswer = (answer_id) => {
    const res = axios.delete('/api/delete/answer', { data: { answer_id } })
    return res
}

export const getSampleQuestions = () => {
    //query to get answer choices:
    const items = [{
        id: Number.MIN_SAFE_INTEGER,
        body: "Sample Question",
        points: 1,
        responses: [{
            id: Number.MIN_SAFE_INTEGER,
            body: "Sample Response",
            correct: true
        }]
    }]
    return items
}