import { useState } from "react"

const QuestionCard = (props) => {
    const [value, setValue] = useState(props.response)
    const handleChange = responseId => e => {
        setValue(e.target.id)
        props.handleChoice(props.item.id, responseId)
    }
    
    //TODO: change push notifications to be question id
    return (
        <div className="max-w-md mb-5 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8 w-full">
                    <form action="#" method="POST">
                        <fieldset>
                        <div>
                            <div className="flex justify-between">
                                <legend className="text-base font-medium uppercase tracking-wide text-sm text-indigo-500 font-semibold">Question {props.number + 1}: </legend>
                                <div>{props.item.points || 1} points</div>
                            </div>
                            <p className="text-gray-500">{props.item.body}{props.item.quiz_difficulty}</p>
                        </div>
                        <div className="px-4 bg-white space-y-6 sm:px-6">
                            <div className="mt-4 space-y-4">
                                {Object.keys(props.item.responses).map(id => (
                                    <AnswerRow 
                                        key={id}
                                        id={id} 
                                        body={props.item.responses[id]}
                                        handleChange={handleChange}
                                        value={value}
                                    />
                                ))}
                            </div>
                        </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AnswerRow = (props) => (
    <div className="flex items-center">
    <input 
        id={props.id} 
        checked={props.value === props.id}
        onChange={props.handleChange(props.id)} 
        name="push_notifications" 
        type="radio" 
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
    />
    <label htmlFor={props.id} className="ml-3 block text-sm font-medium text-gray-700">
        {props.body}
    </label>
    </div>
)

export default QuestionCard