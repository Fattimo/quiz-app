import EditableQuizDetails from "./EditableQuizDetails"
import Questions from "./Questions"
import { useEffect, useState } from "react"
import fetch from 'isomorphic-unfetch'

const EditableQuizView = (props) => {
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
            <Questions editable={true}/>
            <div className="px-4 pt-3 text-center sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save and Update Quiz
                </button>
            </div>
        </div>
    )
}

export default EditableQuizView