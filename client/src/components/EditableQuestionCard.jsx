import { useState, useRef } from "react"
import Dropdown from "./Dropdown"
import ContentEditable from "./SanitizedContentEditable"

const EditableQuestionCard = (props) => {
    const {question, trash, number, changeQuestionProperty, removeQuestion, addResponse, removeResponse, changeResponseProperty } = props

    const [responses, setResponses] = useState(question.responses)
    const handleAddResponse = () => setResponses([...responses, addResponse()])

    const handleRemoveResponse = (id) => () => {
        const [updatedResponses, newCorrectId] = removeResponse(id)
        setResponses([...updatedResponses])
        setCorrectId(newCorrectId)
    }

    const POINTS = [1,2,3,4,5,6,7,8,9,10]
    const [points, setPointsState] = useState(question.points)
    const setPoints = (value) => {setPointsState(changeQuestionProperty("points", value))}

    const [showPoints, setShowPoints] = useState(false)
    const toggleShowPoints = () => setShowPoints(!showPoints)
    
    const body  = useRef(question.body)
    const handleBodyChange = (value) => body.current = changeQuestionProperty("body", value)

    const [correctId, setCorrectId] = useState(question.correct)
    const handleCorrectIdChange = (id) => () => setCorrectId(changeQuestionProperty("correct", id))

    const preventDefault = (e) => {
        e.preventDefault()
    }
    //TODO: change push notifications to be question id
    return (
        <div className="max-w-md mb-5 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <form onSubmit={preventDefault}>
                        <fieldset>
                        <div>
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    {trash ?
                                    <button onClick={removeQuestion} className="mr-2 flex cursor-pointer items-center text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                                    </button> : ""}
                                    <legend className="text-base font-medium uppercase tracking-wide text-sm text-indigo-500 font-semibold">Question {number + 1}: </legend>
                                </div>
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
                                className="text-gray-500 mt-2 border"
                                html={body.current}
                                onChange={handleBodyChange}
                            />
                        </div>
                        <div className="px-4 bg-white space-y-6 sm:px-6 mt-4 space-y-4 flex flex-col md:w-104 w-76">
                            {responses.map((response, i) => (
                                <AnswerRow 
                                    key={response.id}
                                    trash={responses.length > 1}
                                    correctId={parseInt(correctId)} 
                                    response={response}
                                    handleChange={handleCorrectIdChange(parseInt(response.id))}
                                    setProperty={changeResponseProperty(i)}
                                    remove={handleRemoveResponse(i)}
                                />
                            ))}
                            {responses.length < 5 ? 
                            <button onClick={handleAddResponse} className="flex cursor-pointer items-center w-full text-gray-300 hover:text-indigo-600 hover:animate-pulse duration-300">
                                <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                                <div className="flex-grow ml-3 bg-current px-2 w-11/12 h-4 rounded"></div>
                            </button>: ""}
                        </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AnswerRow = (props) => {
    const response = props.response
    const body = useRef(response.body)
    const handleBodyChange = value => body.current = props.setProperty("body", value)

    return (
    <div className="flex items-center">
    <input 
        id={response.id} 
        name="push_notifications" 
        type="radio" 
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
        checked={response.id===props.correctId}
        onChange={props.handleChange}
    />
    <ContentEditable
        className="ml-3 block border text-sm font-medium text-gray-700 px-2 w-11/12 flex-grow break-words"
        html={body.current}
        onChange={handleBodyChange}
    />
    {props.trash ? 
    <button onClick={props.remove} className="flex cursor-pointer items-center text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
    </button> : ""}
    </div>
)}

export default EditableQuestionCard