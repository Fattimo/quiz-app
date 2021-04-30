import { useState } from "react"
import Dropdown from "./Dropdown"
import ContentEditable from "react-contenteditable"

const EditableQuestionCard = (props) => {
    const question = props.item

    const POINTS = [1,2,3,4,5,6,7,8,9,10]
    const [points, setPoints] = props.states.points
    
    const [showPoints, setShowPoints] = useState(false)
    const toggleShowPoints = () => setShowPoints(!showPoints)
    
    const [body, handleBodyChange]  = props.states.body //replace with body passed thru props
    
    //TODO: change push notifications to be question id
    return (
        <div className="max-w-md mb-5 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <form action='javascript:void(0);' method="POST">
                        <fieldset>
                        <div>
                            <div className="flex justify-between">
                                <legend className="text-base font-medium uppercase tracking-wide text-sm text-indigo-500 font-semibold">Question {props.number + 1}: </legend>
                                <div>
                                    <Dropdown 
                                        show={showPoints} 
                                        toggle={toggleShowPoints} 
                                        setter={setPoints} 
                                        selection={points} 
                                        options={POINTS}
                                    />
                                    &nbsp;points
                                </div>
                            </div>
                            <ContentEditable 
                                className="text-gray-500 mt-2"
                                html={body}
                                onChange={handleBodyChange}
                            />
                        </div>
                        <AnswerChoices 
                            responseIds={Object.keys(question.responses)}
                            correctState={props.states.correct}
                            makeResponseState={props.states.response}
                        />
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AnswerChoices = (props) => {
    const [correctId, setCorrectId] = props.correctState
    const handleCorrectResponseChange = id => e => {
        setCorrectId(id)
    }
    return (
        <div className="px-4 bg-white space-y-6 sm:px-6">
            <div className="mt-4 space-y-4">
                {props.responseIds.map((id) => (
                    <AnswerRow 
                        key={id} 
                        id={parseInt(id)}
                        correctId={correctId} 
                        handleChange={handleCorrectResponseChange(parseInt(id))}
                        bodyState={props.makeResponseState(id)}
                    />
                ))}
            </div>
        </div>
    )
}

const AnswerRow = (props) => {
    const [body, handleBodyChange] = props.bodyState
    return (
    <div className="flex items-center">
    <input 
        id={props.id} 
        name="push_notifications" 
        type="radio" 
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
        checked={props.id===props.correctId}
        onChange={props.handleChange}
    />
    <ContentEditable
        className="ml-3 block text-sm font-medium text-gray-700 px-2"
        html={body}
        onChange={handleBodyChange}
    />
    </div>
)}

export default EditableQuestionCard