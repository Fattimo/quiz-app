import QuizCard from "../components/QuizCard"
import LikedQuizzesContainer from "../containers/LikedQuizzesContainer"

const Liked = () => {
    const { likedQuizzes, removeLikedQuiz } = LikedQuizzesContainer.useContainer()
    const quizzes = Object.values(likedQuizzes)

    const handleLikeClick = (quizId) => () => {
        removeLikedQuiz(quizId)
    }
    return (
        <div>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-10 text-center">
            <span className="block inline uppercase tracking-widest text-gray-700">Liked Quizzes</span>
            </h1>
            {quizzes.length > 0 ? 
            quizzes.map((i, index) => (
                <QuizCard key={index} item={i} isLiked={true} toggleLike={handleLikeClick(i.id)}></QuizCard>
            )):
            <p className="text-center m-10 uppercase tracking-wide text-gray-500 font-semibold">
                There are no liked quizzes Q.Q
            </p>
            }
        </div>
    )
}

export default Liked