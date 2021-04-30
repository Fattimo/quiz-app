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

    return (
        <div>
            <h3>Requested topic ID: {props.topicId}</h3>
            <EditableQuizDetails states={quiz.header} />
            {items.map(([id, item], index) => (
                <EditableQuestionCard 
                    key={id} 
                    number={index} 
                    item={{id, ...item}} 
                    states={quiz.questionStates(id)}
                />
            ))}
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={saveQuiz} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save and Update Quiz
                </button>
            </div>
        </div>
    )
}

export default EditableQuizView