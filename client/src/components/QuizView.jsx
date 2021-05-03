import { useState } from "react"

import QuizDetails from "./QuizDetails"
import QuestionCard from "./QuestionCard"
import QuizContainer from "../containers/QuizContainer"

const QuizView = (props) => {
    const quiz = QuizContainer.useContainer()
    const questions = props.questions
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState()
    const [totPoints, setTotPoints] = useState()

    const submitQuiz = () => {
        console.log(questions)
        if (submitted) return
        setSubmitted(true)
        const questionMap = {}
        let points = 0.0
        for (const question of questions) {
            questionMap[question.id] = question
            points += question.points
        }
        let score = 0.0
        for (const ans in quiz.answers) {
            const answer = quiz.answers[ans]
            if (answer) {
                score += questionMap[ans].points
            }
        }
        setScore(score)
        setTotPoints(points)
    }

    return (
        <div className="pb-8">
            <QuizDetails details={props.header}/>
            <Results points={totPoints} score={score} submitted={submitted}/>
            {questions.map((i, index) => (
                <QuestionCard 
                    key={index} 
                    number={index} 
                    item={i} 
                    handleChoice={quiz.makeAnswer}
                    response={quiz.answers[i.id]}
                    submitted={submitted}
                />
            ))}
            <Results points={totPoints} score={score} submitted={submitted}/>
            <div className="px-4 pt-3 text-center sm:px-6">
                <button type="submit" 
                    onClick={submitQuiz} 
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