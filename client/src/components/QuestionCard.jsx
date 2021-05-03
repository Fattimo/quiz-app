import { useState } from "react"

const QuestionCard = (props) => {
    const [value, setValue] = useState(props.response)
    const handleChange = correct => e => {
        setValue(e.target.id)
        props.handleChoice(props.item.id, correct)
    }
    
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
                                {props.item.responses.map(res => (
                                    <AnswerRow 
                                        key={res.id}
                                        id={parseInt(res.id)}
                                        correctId={props.item.correct}
                                        submitted={props.submitted}
                                        response={res}
                                        handleChange={handleChange}
                                        value={parseInt(value)}
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
        onChange={props.handleChange(props.response.correct)} 
        name={props.id} 
        type="radio" 
        disabled={props.submitted}
        className={props.submitted ? 
            "focus:ring-indigo-400 h-4 w-4 text-indigo-400 border-gray-300":
            "focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300"
        }
    />
    <label htmlFor={props.id} className={props.submitted ? 
        `ml-3 block text-sm font-medium ${props.response.correct ? "text-green-600" : "line-through text-gray-400"}`:
        "ml-3 block text-sm font-medium text-gray-700"}
    >
        {props.response.body}
    </label>
    </div>
)

export default QuestionCard