import LikeButton from "./LikeButton"

const QuizDetails = (props) => {
    return (
        <div className="pb-12 bg-white flex flex-col items-center">
            <div className="md:flex-shrink-0 mb-5">
                <img className="h-48 object-cover w-48 rounded-full" src={props.item?.img || "https://www.internetmatters.org/wp-content/uploads/2020/01/Quiz-1-600x315.png"} alt="Man looking at item at a store" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center flex flex-col items-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">XX Questions, Difficulty</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Some Title Here
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-700 lg:mx-auto">
                        Description Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                        accusamus quisquam.
                    </p>
                    <p className="max-w-2xl text-s text-gray-400 lg:mx-auto my-3">
                        Created By Author, Updated XX-XX-XXXX
                    </p>
                    <LikeButton liked={true} tag={true}/>
                </div>
            </div>
        </div>
    )
}

export default QuizDetails