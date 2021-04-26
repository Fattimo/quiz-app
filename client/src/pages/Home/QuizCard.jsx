const QuizCard = (props) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={props.item.img || "https://www.internetmatters.org/wp-content/uploads/2020/01/Quiz-1-600x315.png"} alt="Man looking at item at a store" />
                </div>
                <div className="p-6 w-full">
                    <div className="flex justify-between uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        <div>{props.item.num_questions || "0"} Questions, {props.item.quiz_difficulty}</div>
                        <a href={`/edit/${props.item.id}`} className="hover:underline text-blue-500 cursor-pointer">Edit</a>
                    </div>
                    <a href={`/quizzes/${props.item.id}`} className="table mt-1.5 text-lg leading-tight font-medium text-black hover:underline">{props.item.title}</a>
                    <div className="flex-grow">
                        <p className="mt-1 text-base text-gray-700 oveflow-ellipsis">{props.item.body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros tortor, condimentum id quam quis, ornare tincidunt eros."}</p>    
                    </div>
                    <div className="text-xs text-gray-400 text-right flex justify-between mt-1">
                        <p>Highest Score: idk</p>
                        <p>Created By: {props.item.creator || "Anonymous"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizCard