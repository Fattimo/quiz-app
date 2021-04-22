import InfiniteScroll from "react-infinite-scroll-component"
import QuizCard from "./QuizCard"

const InfiniteQuizScroll = (props) => {
    const items = [{
        id: "123",
        title: "test",
        last_updated: new Date(10000),
        quiz_difficulty: "hard"
    }]
    return (
        <InfiniteScroll
            dataLength={items.length}
            hasMore={false}
            next={()=>{}}
            loader={<h4>Loading...</h4>}
        >
            {items.map((i, index) => (
                <QuizCard key={index} item={i}></QuizCard>
            ))}
        </InfiniteScroll>
    )
}

export default InfiniteQuizScroll