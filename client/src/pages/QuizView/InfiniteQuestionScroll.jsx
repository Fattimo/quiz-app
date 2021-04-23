import InfiniteScroll from "react-infinite-scroll-component"
import QuestionCard from "./QuestionCard"

const InfiniteQuestionScroll = (props) => {
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
        >
            {items.map((i, index) => (
                <QuestionCard key={index} number={index} item={i}></QuestionCard>
            ))}
        </InfiniteScroll>
    )
}

export default InfiniteQuestionScroll