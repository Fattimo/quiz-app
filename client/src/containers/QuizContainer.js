import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useQuizContainer = () => {
    const [answers, setAnswers] = useState({})

    const makeAnswer = (questionId, correct) => {
        setAnswers({...answers, [questionId]: correct})
    }
    
    return {
        answers,
        makeAnswer
    }
}

const QuizContainer = createContainer(useQuizContainer)

export default QuizContainer