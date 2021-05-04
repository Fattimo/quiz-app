import { useState, useEffect } from "react"
import { useContainer } from "unstated-next"

import EditableQuizDetails from "./EditableQuizDetails"
import EditableQuestionCard from "./EditableQuestionCard"
import EditQuizContainer from "../containers/EditQuizContainer"
import { createAnswer, createQuestion, createQuiz, deleteAnswer, deleteQuestion, deleteQuiz, updateAnswer, updateQuestion, updateQuiz } from "../services/http"
import { Redirect } from "react-router"

const EditableQuizView = (props) => {
    //TODO: put stuff from db here for initial state setting
    const quiz = useContainer(EditQuizContainer)
    const [items, setItems] = useState([])
    const [header, setHeader] = useState({})
    const [redirect, setRedirect] = useState(0)

    useEffect(() => {
        quiz.setInitialValues(props.header, props.questions)
        setItems(Object.entries(quiz.questions))
        setHeader(quiz.headerGetters())
    }, [quiz, props.header, props.questions])

    const saveQuiz = async () => {
        const {title, description, difficulty, color} = quiz.headerGetters()
        const quizId = (await updateQuiz(title, description, difficulty, color, items.length, props.header.id)).data[0].id
        await updateChildren(quizId)
        await removeQuestionsResponses(quiz.removedQuestions, quiz.removedResponses)
        setRedirect(`/quizzes/${quizId}`)
    }

    const createNewQuiz = async () => {
        const {title, description, difficulty, color} = quiz.headerGetters()
        const newQuizId = (await createQuiz(title, description, difficulty, color, items.length)).data[0].id
        await updateChildren(newQuizId)
        setRedirect(`/quizzes/${newQuizId}`)
    }

    const updateChildren = async (quizId) => {
        for (const question_id in quiz.questions) {
            const question = quiz.questions[question_id]
            let questionId = parseInt(question_id)
            if (questionId < 0) {
                questionId = (await createQuestion(question.body, question.points, quizId)).data[0].id
            } else {
                await updateQuestion(question.body, question.points, quizId, questionId)
            }
            for (const res_id in question.responses) {
                if (parseInt(res_id) < 0) {
                    await createAnswer(questionId, question.responses[res_id].body, parseInt(question.correct)===parseInt(res_id))
                } else {
                    await updateAnswer(questionId, question.responses[res_id].body, parseInt(question.correct)===parseInt(res_id), parseInt(res_id))
                }
            }
        }
    }

    const removeQuestionsResponses = async (removedQuestions, removedResponses) => {
        for (const response of removedResponses) {
            await deleteAnswer(parseInt(response))
        }
        for (const question of removedQuestions) {
            await deleteQuestion(parseInt(question))
        }
    }

    const removeQuiz = async () => {
        await deleteQuiz(parseInt(props.quizId))
        setRedirect(`/quizzes`)
    }

    const addQuestion = () => {
        quiz.addQuestion()
        setItems(Object.entries(quiz.questions))
    }

    const removeQuestion = (id) => () => {
        quiz.removeQuestion(id)
        setItems(Object.entries(quiz.questions))
    }

    return redirect ? <Redirect to={redirect}/>
    :(
        <div className="pb-8">
            <EditableQuizDetails getters={header} setters={quiz.headerSetters} numQuestions={items.length}/>
            {items.map(([id, item], index) => (
                <EditableQuestionCard 
                    key={id} 
                    number={index} 
                    item={{id, ...item}} 
                    getters={quiz.questionPropertyGetters(id)}
                    setters={quiz.questionPropertySetters(id)}
                    removeQuestion={removeQuestion(id)}
                    addResponse={quiz.addResponse(id)}
                    removeResponse={quiz.removeResponse(id)}
                />
            ))}
            <div className="text-center">
                <button onClick={addQuestion} className="inline-flex justify-center cursor-pointer w-max text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
                <svg className="w-20 h-20 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </button>
            </div>
            {props.quizId === "new" ? 
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={createNewQuiz} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create New Quiz
                </button>
            </div> :
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={saveQuiz} type="submit" className="mx-4 w-48 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save and Update Quiz
                </button>
                <button onClick={removeQuiz}type="submit" className="mx-4 inline-flex w-48 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Delete Quiz
                </button>
            </div>
            }
        </div>
    )
}

export default EditableQuizView