import InfiniteScroll from "react-infinite-scroll-component"
import QuizCard from "./QuizCard"

const InfiniteQuizScroll = (props) => {
    const items = [{
        id: "123",
        title: "test",
        last_updated: new Date(10000),
        quiz_difficulty: "hard"
    },
    {
        id: "456",
        title: "test2",
        last_updated: new Date(10000),
        quiz_difficulty: "easy"
    }]
    return (
        <InfiniteScroll
            dataLength={items.length}
            hasMore={false}
            next={()=>{}}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p className="text-center m-10 uppercase tracking-wide text-gray-500 font-semibold">
                    There are no more quizzes T_T
                </p>
            }
        >
            {items.map((i, index) => (
                <QuizCard key={index} item={i}></QuizCard>
            ))}
        </InfiniteScroll>
    )
}

export default InfiniteQuizScroll