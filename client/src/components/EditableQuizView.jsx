import { useState } from "react"
import { useContainer } from "unstated-next"

import EditableQuizDetails from "./EditableQuizDetails"
import EditableQuestionCard from "./EditableQuestionCard"
import EditQuizContainer from "../containers/EditQuizContainer"

const EditableQuizView = (props) => {
    //TODO: put stuff from db here for initial state setting
    const quiz = useContainer(EditQuizContainer)
    const [items, setItems] = useState(Object.entries(quiz.questions))

    const saveQuiz = () => {
        console.log(quiz.header.title[0].current)
        console.log(quiz.questions)
    }

    const addQuestion = () => {
        quiz.addQuestion()
        setItems(Object.entries(quiz.questions))
    }

    return (
        <div className="pb-8">
            <h3>Requested topic ID: {props.quizId}</h3>
            <EditableQuizDetails states={quiz.header} numQuestions={items.length}/>
            {items.map(([id, item], index) => (
                <EditableQuestionCard 
                    key={id} 
                    number={index} 
                    item={{id, ...item}} 
                    getters={quiz.questionPropertyGetters(id)}
                    setters={quiz.questionPropertySetters(id)}
                    addResponse={quiz.addResponse(id)}
                />
            ))}
            <div onClick={addQuestion} className="mx-auto cursor-pointer w-max text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
            <svg className="w-20 h-20 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
            </div>
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={saveQuiz} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save and Update Quiz
                </button>
            </div>
        </div>
    )
}

export default EditableQuizView