import EditableQuestionCard from "./EditableQuestionCard"
import QuestionCard from "./QuestionCard"

const Questions = (props) => {
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
        <div>
            {props.editable ? 
            items.map((i, index) => (
                <EditableQuestionCard key={index} number={index} item={i} />
            ))
            :items.map((i, index) => (
                <QuestionCard key={index} number={index} item={i} />
            ))}
        </div>
    )
}

export default Questions