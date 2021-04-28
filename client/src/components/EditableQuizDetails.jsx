import { useRef, useState } from "react"
import ContentEditable from "react-contenteditable"

import Dropdown from "./Dropdown"

const EditableQuizDetails = (props) => {
    const COLORS = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
    const DIFFICULTIES = ['easy', 'medium', 'hard']
    //TODO: replace with database equivalents
    const [theme, setTheme] = useState('indigo')
    const [difficulty, setDifficulty] = useState('medium')
    const [showTheme, setShowTheme] = useState(false)
    const [showDifficulty, setShowDifficulty] = useState(false)

    const toggleTheme = () => {
        if (showTheme) {
            setShowTheme(false);
        } else {
            if (showDifficulty) {
                setShowDifficulty(false)
            }
            setShowTheme(true)
        }
    }

    const toggleDifficulty = () => {
        if (showDifficulty) {
            setShowDifficulty(false);
        } else {
            if (showTheme) {
                setShowTheme(false)
            }
            setShowDifficulty(true)
        }
    }

    const title = useRef('test')
    const description = useRef('descirption')
    const handleChange = property => e => {
        property.current = e.target.value
    }

    return (
        <div className="pb-12 bg-white flex flex-col lg:flex-row items-center max-w-5xl xl:max-w-6xl 2xl:max-2-7xl mx-auto px-8 sm:px-20 lg:px-24 justify-center">
            <div className="flex flex-col items-center md:flex-row mb-10 sm:mb-5 md:mr-4">
                <div className="md:flex-shrink-0 mb-5 md:mr-9 relative">
                    <img className="h-48 object-cover w-48" src={props.item?.img || "https://www.internetmatters.org/wp-content/uploads/2020/01/Quiz-1-600x315.png"} alt="Man looking at item at a store" />
                    <div className="absolute inset-0 opacity-0 hover:opacity-80 cursor-pointer overflow-hidden">
                    <img className="h-48 object-cover w-48 transform scale-110" src="https://cdn5.vectorstock.com/i/1000x1000/51/14/camera-icon-on-white-background-vector-17685114.jpg" alt="CCamera" />
                    </div>
                </div>
                <div className="flex flex-col w-60 sm:w-72 md:w-96 items-start items-center text-center md:text-left md:items-start">
                    <h2 className="pl-1 text-base text-indigo-600 font-semibold tracking-wide uppercase text-left">Editing: </h2>
                    <ContentEditable 
                        className="p-1 mt-2 w-full break-words text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                        html={title.current}
                        onChange={handleChange(title)}
                    />
                    <ContentEditable 
                        className="mt-2 text-xl text-gray-700 w-full p-1 break-words"
                        html={description.current}
                        onChange={handleChange(description)}
                    />
                </div>
            </div>
            <div className="text-center flex lg:flex-col flex-col md:flex-row content-around justify-around items-center md:w-9/12 h-36 lg:h-40 md:h-auto lg:w-auto">
                <div className={`lg:w-52 justify-between items-center flex text-base text-${props.decorator ? props.selection : 'indigo'}-500 font-semibold tracking-wide uppercase text-left`}>
                    Theme: <Dropdown show={showTheme} toggle={toggleTheme} setter={setTheme} selection={theme} options={COLORS} decorator={true} width="24"/>
                </div>
                <div className={`lg:w-52 justify-between items-center flex text-base text-${props.decorator ? props.selection : 'indigo'}-500 font-semibold tracking-wide uppercase text-left`}>
                    Difficulty: <Dropdown show={showDifficulty} toggle={toggleDifficulty} setter={setDifficulty} selection={difficulty} options={DIFFICULTIES} width="24"/>
                </div>
                <h2 className="text-base whitespace-nowrap text-indigo-600 font-semibold tracking-wide uppercase text-left">XX Questions</h2>
            </div>
        </div>
    )
}

export default EditableQuizDetails