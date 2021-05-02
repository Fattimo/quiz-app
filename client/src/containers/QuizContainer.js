import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useQuizContainer = () => {
    const [answers, setAnswers] = useState({})

    const makeAnswer = (questionId, responseId) => {
        setAnswers({...answers, [questionId]: parseInt(responseId)})
    }
    
    return {
        answers,
        makeAnswer
    }
}

const QuizContainer = createContainer(useQuizContainer)

export default QuizContainer