import EditableQuizDetails from "./EditableQuizDetails"
import { useEffect, useState } from "react"
import fetch from 'isomorphic-unfetch'
import EditableQuestionCard from "./EditableQuestionCard"

const EditableQuizView = (props) => {
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

    useEffect(()=> {
        fetch('/api/hello', { method: "GET" })
          .then(res => res.json()
          .then(r => setState(r))
        )
    }, [])
    
    const [state, setState] = useState('')

    return (
        <div>
            <h3>Requested topic ID: {props.topicId}</h3>
            <EditableQuizDetails />
            {items.map((i, index) => (
                <EditableQuestionCard key={index} number={index} item={i} />
            ))}
            <div className="px-4 pt-3 text-center sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save and Update Quiz
                </button>
            </div>
        </div>
    )
}

export default EditableQuizView