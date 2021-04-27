import { useEffect, useRef, useState } from "react"
import Dropdown from "./Dropdown"
import ContentEditable from "react-contenteditable"

const EditableQuestionCard = (props) => {
    //query to get answer choices:
    const choices = [
        {
            id: "123",
            label: 'a',
            body: '125',
            correct: 'false'
        },
        {
            id: "223",
            label: 'b',
            body: '1',
            correct: 'false'
        },
        {
            id: "323",
            label: 'c',
            body: '2',
            correct: 'true'
        }
    ]

    const POINTS = [1,2,3,4,5,6,7,8,9,10]
    const [points, setPoints] = useState(props.item.points || 1)
    const [showPoints, setShowPoints] = useState(false)
    const toggleShowPoints = () => {
        setShowPoints(!showPoints)
    }

    const body = useRef('sample body') //replace with body passed thru props
    const handleChange = (e) => {
        body.current = e.target.value
    }
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
                                    <Dropdown show={showPoints} toggle={toggleShowPoints} setter={setPoints} selection={points} options={POINTS}/>
                                    &nbsp;points
                                </div>
                            </div>
                            <ContentEditable 
                                className="text-gray-500 mt-2"
                                html={body.current}
                                onChange={handleChange}
                            />
                        </div>
                        <AnswerChoices choices={choices}/>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AnswerChoices = (props) => {
    const [correctId, setCorrectId] = useState(props.choices[0])
    useEffect(() => {
        for (const item of props.choices) {
            if (item.correct) {
                setCorrectId(item.id)
                break;
            }
        }
    }, [props.choices])

    const handleChange = id => e => {
        setCorrectId(id)
    }
    return (
        <div className="px-4 bg-white space-y-6 sm:px-6">
            <div className="mt-4 space-y-4">
                {props.choices.map(item => (
                    <AnswerRow item={item} correctId={correctId} handleChange={handleChange(item.id)}/>
                ))}
            </div>
        </div>
    )
}

const AnswerRow = (props) => {
    const body = useRef(props.item.body)
    const handleChange = (e) => {
        body.current = e.target.event
    }
    return (
    <div className="flex items-center">
    <input 
        id={props.item.id} 
        name="push_notifications" 
        type="radio" 
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" 
        checked={props.item.id===props.correctId}
        onChange={props.handleChange}
    />
    <ContentEditable
        className="ml-3 block text-sm font-medium text-gray-700 px-2"
        html={body.current}
        onChange={handleChange}
    />
    </div>
)}

export default EditableQuestionCard