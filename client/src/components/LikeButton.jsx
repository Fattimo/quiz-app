import { useState, useEffect } from "react"

const LikeButton = (props) => {
    const {liked, tag, toggle, likes} = props
    const [displayedLikes, setDisplayedLikes] = useState(likes)
    const handleToggle= () => {
        toggle()
        setDisplayedLikes(liked ? displayedLikes - 1 : displayedLikes + 1)
    }
    useEffect(() => {
        setDisplayedLikes(likes)
    }, [likes])

    return (
        <div className="cursor-pointer flex" onClick={handleToggle}>
            {liked ? 
                <svg className="fill-current text-red-400" xmlns="http://www.w3.org/2000/svg" height={`${props.size ? props.size : 24}px`} viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                : <svg className="fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" height={`${props.size ? props.size : 24}px`} viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 5c-1.54 0-3.04.99-3.56 2.36h-1.87C10.54 5.99 9.04 5 7.5 5 5.5 5 4 6.5 4 8.5c0 2.89 3.14 5.74 7.9 10.05l.1.1.1-.1C16.86 14.24 20 11.39 20 8.5c0-2-1.5-3.5-3.5-3.5z" opacity=".3"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
            }
            {tag==="long" ? <div className={`${liked ? "text-red-400" : "text-gray-400"} mx-1 font-semibold text-s tracking-wide uppercase`}>{displayedLikes} Likes</div> : 
            tag==="number" ? <div className={`${liked ? "text-red-400" : "text-gray-400"} mx-1 font-semibold text-s tracking-wide uppercase`}>{displayedLikes}</div>:""}
        </div>
    )
}

export default LikeButton