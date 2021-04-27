import HomeHeader from "../components/HomeHeader";
import InfiniteQuizScroll from "../components/InfiniteQuizScroll"

function Home(props) {
    return (
        <div>
            <HomeHeader />
            <InfiniteQuizScroll />
        </div>
    );
}

export default Home