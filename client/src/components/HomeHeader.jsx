import { useState } from "react"
import { Redirect } from "react-router"

const HomeHeader= (props) => {
    const [redirect, setRedirect] = useState(0)

    return redirect ? 
    <Redirect to={redirect}/>:(
        <div className="flex flex-col items-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block inline uppercase tracking-widest text-gray-700">Quiz Thing</span>
            </h1>
            <p className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl mx-auto md:mt-5 md:text-xl">
            Tool created to make and take multiple choice quizzes!
            </p>
            <div className="mt-5 sm:mt-8 flex justify-center mb-5">
            <div className="rounded-md shadow w-44 sm:w-52">
                <div
                onClick={() => setRedirect("/new")}
                className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                Make a Quiz
                </div>
            </div>
            <div className="ml-3 w-44 sm:w-52">
                <div
                onClick={()=>setRedirect("/liked")}
                className="w-full cursor-pointer flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                Liked Quizzes
                </div>
            </div>
            </div>
            <input className="mb-5 text-center px-8 py-2 rounded-md shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent placeholder-indigo-500 placeholder-opacity-50" placeholder="Search (Not Functional)"></input>
        </div>
    )
}

export default HomeHeader