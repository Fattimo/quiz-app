import QuizDetails from "./QuizDetails"
import QuestionCard from "./QuestionCard"
import QuizContainer from "../containers/QuizContainer"

const QuizView = (props) => {
    const quiz = QuizContainer.useContainer()
    const questions = props.questions

    const submitQuiz = () => {
        const questionMap = {}
        let points = 0.0
        for (const question of questions) {
            questionMap[question.id] = question
            points += question.points
        }
        let score = 0.0
        for (const ans in quiz.answers) {
            const answer = quiz.answers[ans]
            if (answer === questionMap[ans].correct) {
                score += questionMap[ans].points
            }
        }
        console.log(points)
        console.log(score)
        console.log(score/points)
        console.log(quiz.answers)
    }

    return (
        <div className="pb-8">
            <h3>Requested topic ID: {props.topicId}</h3>
            <QuizDetails />
            {questions.map((i, index) => (
                <QuestionCard 
                    key={index} 
                    number={index} 
                    item={i} 
                    handleChoice={quiz.makeAnswer}
                    response={quiz.answers[i.id]}
                />
            ))}
            <div className="px-4 pt-3 text-center sm:px-6">
                <button type="submit" onClick={submitQuiz} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
                </button>
            </div>
        </div>
    )
}

export default QuizView