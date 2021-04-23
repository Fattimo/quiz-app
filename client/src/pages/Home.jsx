import CreateQuizCard from "./Home/CreateQuizCard";
import InfiniteQuizScroll from "./Home/InfiniteQuizScroll"

function Home(props) {
    return (
        <div>
            <h2>Home</h2>
            {props.edit === true ? <CreateQuizCard /> : ""}
            <InfiniteQuizScroll />
        </div>
    );
}

export default Home