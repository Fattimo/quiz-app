import { useState, useEffect } from "react"

import QuizDetails from "./QuizDetails"
import QuestionCard from "./QuestionCard"
import { getQuiz, getQuizQuestions } from '../services/http'

const useQuizGenerator = (quizId) => {
    const [questions, setQuestions] = useState([])
    const [quizDetails, setQuizDetails] = useState({})
    useEffect(()=> {
        const fetchData = async () => {
            const [quizDetails, quizQuestions] = await Promise.all([getQuiz(parseInt(quizId)), getQuizQuestions(parseInt(quizId))])
            setQuestions(quizQuestions.data)
            setQuizDetails(quizDetails.data[0])
        }
        fetchData()
    }, [quizId])

    return { questions, quizDetails }
}

const useSubmission = () => {
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState()
    const [totPoints, setTotPoints] = useState()
    const [answers, setAnswers] = useState({})

    const makeAnswer = (questionId, correct) => {
        setAnswers({...answers, [questionId]: correct})
    }

    const submitQuiz = (questions) => {
        if (submitted) return
        setSubmitted(true)
        const questionMap = {}
        let points = 0.0
        for (const question of questions) {
            questionMap[question.id] = question
            points += question.points
        }
        let score = 0.0
        for (const ans in answers) {
            const answer = answers[ans]
            if (answer) {
                score += questionMap[ans].points
            }
        }
        setScore(score)
        setTotPoints(points)
    }

    return {submitted, score, totPoints, answers, submitQuiz, makeAnswer}
}


const QuizView = (props) => {
    const { questions, quizDetails } = useQuizGenerator(props.quizId)
    const { submitted, score, totPoints, answers, submitQuiz, makeAnswer} = useSubmission()

    const handleSubmitQuiz = () => submitQuiz(questions)

    return (
        <div className="pb-8">
            <QuizDetails details={quizDetails}/>
            <Results points={totPoints} score={score} submitted={submitted}/>
            {questions.map((i, index) => (
                <QuestionCard 
                    key={index} 
                    number={index} 
                    item={i} 
                    handleChoice={makeAnswer}
                    response={answers[i.id]}
                    submitted={submitted}
                />
            ))}
            <Results points={totPoints} score={score} submitted={submitted}/>
            <div className="px-4 pt-3 text-center sm:px-6">
                <button type="submit" 
                    onClick={handleSubmitQuiz} 
                    className={submitted ? 
                        "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 focus:outline-none focus:border-gray-400":
                        "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
                >
                Submit
                </button>
            </div>
        </div>
    )
}

const Results = (props) => (
    <p className="text-center uppercase tracking-wide text-indigo-600 font-semibold">
        Results: {props.submitted ? `${props.score}/${props.points} (${(props.score/props.points * 100).toFixed(2)}%)` : "N/A"}
    </p>
)

export default QuizView