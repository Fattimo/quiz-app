const QuestionCard = (props) => {
    console.log(props)
    //query to get answer choices:
    const choices = [
        {
            id: "123",
            label: 'a',
            body: '12',
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
                            <p className="text-gray-500">lorem question body {props.item.quiz_difficulty}</p>
                        </div>
                        <div className="px-4 bg-white space-y-6 sm:px-6">
                            <div className="mt-4 space-y-4">
                                {choices.map(item => (
                                    <AnswerRow item={item}/>
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
    <input id={props.item.id} name="push_notifications" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
    <label for={props.item.id} className="ml-3 block text-sm font-medium text-gray-700">
        {props.item.body}
    </label>
    </div>
)

export default QuestionCard