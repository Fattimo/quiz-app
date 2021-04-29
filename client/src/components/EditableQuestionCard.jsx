import { useState } from "react"
import Dropdown from "./Dropdown"
import ContentEditable from "react-contenteditable"

const EditableQuestionCard = (props) => {
    const question = props.item

    const POINTS = [1,2,3,4,5,6,7,8,9,10]
    const [points, setPoints] = useState(question.points.current || 1)
    const pointSetter = value => {
        console.log(value)
        setPoints(value)
        props.editors.points(value)
    }
    const [showPoints, setShowPoints] = useState(false)
    const toggleShowPoints = () => setShowPoints(!showPoints)
    

    const body = question.body //replace with body passed thru props
    const handleBodyChange = e => props.editors.body(e.target.value)
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
                                        setter={pointSetter} 
                                        selection={points} 
                                        options={POINTS}
                                    />
                                    &nbsp;points
                                </div>
                            </div>
                            <ContentEditable 
                                className="text-gray-500 mt-2"
                                html={body.current}
                                onChange={handleBodyChange}
                            />
                        </div>
                        <AnswerChoices 
                            choices={question.responses}
                            correct={question.correct}
                            setCorrect={props.editors.correct}
                            setResponseBody={props.editors.response}
                        />
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AnswerChoices = (props) => {
    const [correctId, setCorrectId] = useState(props.correct.current)
    const responses = Object.entries(props.choices)
    const handleCorrectResponseChange = id => e => {
        props.setCorrect(id)
        setCorrectId(id)
    }
    return (
        <div className="px-4 bg-white space-y-6 sm:px-6">
            <div className="mt-4 space-y-4">
                {responses.map(([id, body]) => (
                    <AnswerRow 
                        key={id} 
                        id={id}
                        body={body} 
                        correctId={correctId} 
                        handleChange={handleCorrectResponseChange(id)}
                        setBody={props.setResponseBody(id)}
                    />
                ))}
            </div>
        </div>
    )
}

const AnswerRow = (props) => {
    const body = props.body
    const handleBodyChange = (e) => props.setBody(e.target.value)
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
        html={body.current}
        onChange={handleBodyChange}
    />
    </div>
)}

export default EditableQuestionCard