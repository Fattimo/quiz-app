import InfiniteScroll from "react-infinite-scroll-component"
import { useState, useRef, useEffect } from 'react'

import QuizCard from "./QuizCard"
import { getPaginatedQuizzes } from "../services/http"

const InfiniteQuizScroll = () => {
    const ITEMS_PER_PAGE = 5

    const [quizzes, setQuizzes] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const pageRef = useRef(0)
    useEffect(() => {
        getPaginatedQuizzes(ITEMS_PER_PAGE, 0).then(r => {
            const payload = r.data
            setHasMore(!payload.isLastPage)
            pageRef.current = payload.page
            setQuizzes(payload.quizzes)
        })
    }, [])

    const getNextPage = async () => {
        const nextPage = (await getPaginatedQuizzes(ITEMS_PER_PAGE, pageRef.current + 1)).data
        pageRef.current += 1
        if (nextPage.isLastPage) {
            setHasMore(false)
        }
        setQuizzes([...quizzes, ...nextPage.quizzes])
    }
    return (
        <InfiniteScroll
            dataLength={quizzes.length}
            hasMore={hasMore}
            next={getNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p className="text-center m-10 uppercase tracking-wide text-gray-500 font-semibold">
                    There are no more quizzes T_T
                </p>
            }
        >
            {quizzes.map((i, index) => (
                <QuizCard key={index} item={i}></QuizCard>
            ))}
        </InfiniteScroll>
    )
}

export default InfiniteQuizScroll