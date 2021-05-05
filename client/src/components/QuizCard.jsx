import { Link } from "react-router-dom"
import LikeButton from "./LikeButton"

const QuizCard = (props) => {
    const { img, title, num_questions, id, creator, body, likes, difficulty } = props.item
    const liked = props.isLiked
    const highScore = props.highScore
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-5">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={img || "https://www.internetmatters.org/wp-content/uploads/2020/01/Quiz-1-600x315.png"} alt="Man looking at item at a store" />
                </div>
                <div className="p-6 w-full flex flex-col">
                    <div className="flex justify-between uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        <div>{num_questions || "0"} Questions, {difficulty}</div>
                        <LikeButton liked={liked} tag={"number"} size={22} likes={likes} toggle={props.toggleLike}/>
                    </div>
                    <div className="flex items-center mt-1 ">
                        <Link to={`/quizzes/${id}`} className="table mr-1 text-lg leading-tight font-medium text-black hover:underline">{title}</Link>
                        <Link to={`/edit/${id}`}><svg className="fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></Link>
                    </div>
                    <div className="flex-grow line-clamp-3">
                        <p className="mt-1 text-base text-gray-700 oveflow-ellipsis">{body || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros tortor, condimentum id quam quis, ornare tincidunt eros."}</p>    
                    </div>
                    <div className="text-xs text-gray-400 text-right flex justify-between mt-1">
                        <p>Highest Score: {highScore || highScore===0 ? `${highScore}%` : "N/A"}</p>
                        <p>Created By: {creator || "Anonymous"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizCard