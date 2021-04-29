import QuizDetails from "./QuizDetails"
import QuestionCard from "./QuestionCard"
import QuizContainer from "../containers/QuizContainer"

const QuizView = (props) => {
    const quiz = QuizContainer.useContainer()

    const submitQuiz = () => {
        // take all of the keys of answers (questions) & query for the questions where 
        // its correct answer id matches the id of the value
        console.log(quiz.answers)
    }

    const items = [{
        id: "123",
        title: "test",
        last_updated: new Date(10000),
        quiz_difficulty: "hard"
    },
    {
        id: "456",
        title: "test2",
        last_updated: new Date(10000),
        quiz_difficulty: "easy"
    }]

    return (
        <div>
            <h3>Requested topic ID: {props.topicId}</h3>
            <QuizDetails />
            {items.map((i, index) => (
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