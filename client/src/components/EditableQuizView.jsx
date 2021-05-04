import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router"

import EditableQuizDetails from "./EditableQuizDetails"
import EditableQuestionCard from "./EditableQuestionCard"
import { getSampleQuestions, getQuiz, getQuizQuestions, createAnswer, createQuestion, createQuiz, deleteAnswer, deleteQuestion, deleteQuiz, updateAnswer, updateQuestion, updateQuiz } from "../services/http"


const useQuizHeader = () => {
    const quizDetails = useRef({})
    const setQuizDetails = (newQuizDetails) => quizDetails.current = newQuizDetails
    const setQuizProperty = (property, value) => {
        quizDetails.current[property] = [value]
    }

    return {
        quizDetails, 
        setQuizDetails,
        setQuizProperty
    }
}

const useQuizQuestions = () => {
    const questions = useRef({})
    //Look to optimize this by including correct in the query.
    const setQuestions = (newQuestions) => {
        for(const question of newQuestions) {
            const referencedResponses = {}
            let correctId = -1
            for (const response of question.responses) {
                referencedResponses[response.id] = {
                    body: response.body,
                    correct: response.correct
                }
                if (response.correct) correctId = response.id
            }
            questions.current[question.id]= {
                id: question.id,
                body: question.body,
                points: question.points,
                correct: correctId,
                responses: referencedResponses
            }
        }
    }

    const removedQuestions = useRef([])
    const removedResponses = useRef([])

    const labeler = useRef(-1)

    const addQuestion = () => {
        const label = labeler.current
        questions.current[label] = {
            id: label-1,
            body: "new question",
            points: 1,
            correct: label-1,
            responses: {
                [label-1]: {
                    body: "new response",
                    correct: true
                }
            }
        }
        labeler.current-=2
        return questions.current[label]
    }

    const removeQuestion = (questionId) => {
        const omittedQuestion = questions.current[questionId]
        if (questionId > 0) {
            removedQuestions.push(questionId)
            for (const responseId in omittedQuestion.responses) {
                if (responseId > 0) {
                    removedResponses.push(responseId)
                }
            }
        }
        delete questions.current[questionId]
        return questionId
    }

    const addResponse = (questionId) => () => {
        const newResponse = {
            id: labeler.current,
            body: "response",
            correct: false //doesn't actually matter but it's here
        }
        questions.current[questionId].responses[labeler.current] = newResponse
        labeler.current--;
        return newResponse
    }

    const removeResponse = (questionId) => (responseId) => {
        if (responseId > 0) {
            removedResponses.push(responseId)
        }
        delete questions.current[questionId].responses[responseId]
        return responseId
    }

    const editQuestionProperty = questionId => (property, value) => {
        questions.current[questionId][property] = value
        return value
    }

    const editResponseProperty = questionId => responseId => (property, value) => {
        questions.current[questionId].responses[responseId][property] = value
        return value
    }

    return {
        questions,
        removedQuestions,
        removedResponses,
        setQuestions,
        addQuestion,
        removeQuestion,
        addResponse, 
        removeResponse,
        editQuestionProperty,
        editResponseProperty
    }
}


const EditableQuizView = (props) => {
    //TODO: put stuff from db here for initial state setting
    const quizId = props.quizId
    const {questions, 
        setQuestions,
        addQuestion,
        removeQuestion,
        addResponse, 
        removeResponse,
        editQuestionProperty,
        editResponseProperty,
        removedQuestions,
        removedResponses
    } = useQuizQuestions()
    const {quizDetails, 
        setQuizDetails,
        setQuizProperty
    } = useQuizHeader()

    const [items, setItems] = useState([])
    

    useEffect(() => {
        if (quizId === "new") {
            setQuestions(getSampleQuestions())
            return
        }
        const fetchData = async () => {
            const [quizDetails, quizQuestions] = await Promise.all([getQuiz(parseInt(quizId)), getQuizQuestions(parseInt(quizId))])
            setQuestions(quizQuestions.data)
            setQuizDetails(quizDetails.data[0])
            setItems(questions.current)
        }
        fetchData()
    }, [questions, quizId, setQuestions, setQuizDetails])

    const [redirect, setRedirect] = useState(0)

    const saveQuiz = async () => {
        const {id, title, description, difficulty, color} = quizDetails.current
        const quizId = (await updateQuiz(title, description, difficulty, color, items.length, id)).data[0].id
        await updateChildren(quizId)
        await removeQuestionsResponses(removedQuestions.current, removedResponses.current)
        setRedirect(`/quizzes/${quizId}`)
    }

    const createNewQuiz = async () => {
        const {title, description, difficulty, color} = quizDetails.current
        const newQuizId = (await createQuiz(title, description, difficulty, color, items.length)).data[0].id
        await updateChildren(newQuizId)
        setRedirect(`/quizzes/${newQuizId}`)
    }

    const updateChildren = async (quizId) => {
        for (const question_id in questions.current) {
            const question = questions.current[question_id]
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

    const handleAddQuestion = () => {
        addQuestion()
        setItems(Object.entries(questions.current))
    }

    const handleRemoveQuestion = (id) => () => {
        removeQuestion(id)
        setItems(Object.entries(questions.current))
    }

    return redirect ? <Redirect to={redirect}/>
    :(
        <div className="pb-8">
            <EditableQuizDetails changeProperty={setQuizProperty} header={quizDetails} numQuestions={items.length}/>
            {items.map(([id, item], index) => (
                <EditableQuestionCard 
                    key={id} 
                    number={index} 
                    item={{id, ...item}} 
                    question={questions.current[id]}
                    changeQuestionProperty={editQuestionProperty(id)}
                    removeQuestion={handleRemoveQuestion(id)}
                    addResponse={addResponse(id)}
                    removeResponse={removeResponse(id)}
                    changeResponseProperty={editResponseProperty(id)}
                />
            ))}
            <div className="text-center">
                <button onClick={handleAddQuestion} className="inline-flex justify-center cursor-pointer w-max text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
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