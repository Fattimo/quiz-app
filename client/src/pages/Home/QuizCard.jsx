const QuizCard = (props) => {
    console.log(props.item)
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src="/img/store.jpg" alt="Man looking at item at a store" />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                    <a href={`/quizzes/${props.item.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{props.item.title}</a>
                    <p className="mt-2 text-gray-500">Difficulty: {props.item.quiz_difficulty}</p>
                </div>
            </div>
        </div>
    )
}

export default QuizCard