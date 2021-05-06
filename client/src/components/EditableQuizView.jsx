import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router"

import EditableQuizDetails from "./EditableQuizDetails"
import EditableQuestionCard from "./EditableQuestionCard"
import { getSampleQuestions, getQuiz, getQuizQuestions, createAnswer, createQuestion, createQuiz, deleteAnswer, deleteQuestion, deleteQuiz, updateAnswer, updateQuestion, updateQuiz } from "../services/http"


const useQuizHeader = () => {
    const quizDetails = useRef({})
    const setQuizDetails = (newQuizDetails) => quizDetails.current = newQuizDetails
    const setQuizProperty = (property, value) => {
        quizDetails.current[property] = value
        return value
    }

    return {
        quizDetails, 
        setQuizDetails,
        setQuizProperty
    }
}

const useQuizQuestions = () => {
    const [questions, setQuestions] = useState([])

    const removedQuestions = useRef([])
    const removedResponses = useRef([])

    const labeler = useRef(-1)

    const addQuestion = () =>{
        const label = labeler.current
        setQuestions([...questions,
            {
                id: label,
                body: "new question",
                points: 1,
                correct: label-1,
                responses: [
                    {
                        id: label-1,
                        body: "new response",
                        correct: true
                    }
                ]
            }
        ])
        labeler.current-=2
        return questions[label]
    }

    const removeQuestion = (i) => () => {
        const question = questions[i]
        if (parseInt(question.id) > 0) {
            removedQuestions.current.push(question.id)
            for (const response of question.responses) {
                if (response.id > 0) {
                    removedResponses.current.push(response.id)
                }
            }
        }
        questions.splice(i,1)
        setQuestions([...questions])
        return questions
    }

    const addResponse = (questionId) => () => {
        const newResponse = {
            id: labeler.current,
            body: "response",
            correct: false //doesn't actually matter but it's here
        }
        questions[questionId].responses.push(newResponse)
        labeler.current--;
        return newResponse
    }

    const removeResponse = (questionId) => (i) => {
        const response = questions[questionId].responses[i]
        if (response.id > 0) {
            removedResponses.current.push(response.id)
        }
        const oldCorrect = questions[questionId].correct
        questions[questionId].responses.splice(i,1)
        let newCorrectId = oldCorrect
        if (response.id === oldCorrect) {
            newCorrectId = questions[questionId].responses[Math.max(0,i-1)].id
            questions[questionId].correct = newCorrectId
        }
        return [questions[questionId].responses, newCorrectId]
    }

    const editQuestionProperty = i => (property, value) => {
        questions[i][property] = value
        return value
    }

    const editResponseProperty = questioni => i => (property, value) => {
        questions[questioni].responses[i][property] = value
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

    const [initialQuizDetails, setInitialQuizDetails] = useState()

    useEffect(() => {
        if (quizId === "new") {
            setQuestions(getSampleQuestions())
            const sampleDetails = {
                title: "Title",
                body: "Description",
                color: "indigo",
                difficulty: "easy"
            }
            setQuizDetails(sampleDetails)
            setInitialQuizDetails(sampleDetails)
            return
        }
        const fetchData = async () => {
            const [quizDetails, quizQuestions] = await Promise.all([getQuiz(parseInt(quizId)), getQuizQuestions(parseInt(quizId))])
            setQuestions(quizQuestions.data)
            setQuizDetails(quizDetails.data[0])
            setInitialQuizDetails(quizDetails.data[0])
            if (quizDetails.data.length === 0) setRedirect('/new')
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizId])

    const [redirect, setRedirect] = useState(0)

    const saveQuiz = (isNew) => async () => {
        const {id, title, body, difficulty, color} = quizDetails.current
        const quizId = isNew ? 
            (await createQuiz(title, body, difficulty, color, Object.keys(questions).length)).data[0].id:
            (await updateQuiz(title, body, difficulty, color, Object.keys(questions).length, id)).data[0].id
        await updateChildren(quizId)
        // No effect if it's a new quiz, as both will be empty
        await removeQuestionsResponses(removedQuestions.current, removedResponses.current)
        setRedirect(`/quizzes/${quizId}`)
    }

    const updateChildren = async (quizId) => {
        for (const question of questions) {
            let questionId = parseInt(question.id)
            if (questionId < 0) {
                questionId = (await createQuestion(question.body, question.points, quizId)).data[0].id
            } else {
                await updateQuestion(question.body, question.points, quizId, questionId)
            }
            for (const response of question.responses) {
                if (parseInt(response.id) < 0) {
                    await createAnswer(questionId, response.body, parseInt(question.correct)===parseInt(response.id))
                } else {
                    await updateAnswer(questionId, response.body, parseInt(question.correct)===parseInt(response.id), parseInt(response.id))
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

    return redirect ? <Redirect to={redirect}/>
    :(
        <div className="pb-8">
            <EditableQuizDetails changeProperty={setQuizProperty} header={initialQuizDetails || {}} numQuestions={questions.length}/>
            {questions.map((question, index) => (
                <EditableQuestionCard 
                    key={question.id} 
                    number={index} 
                    trash={questions.length > 1}
                    question={question}
                    changeQuestionProperty={editQuestionProperty(index)}
                    removeQuestion={removeQuestion(index)}
                    addResponse={addResponse(index)}
                    removeResponse={removeResponse(index)}
                    changeResponseProperty={editResponseProperty(index)}
                />
            ))}
            <div className="text-center">
                <button onClick={addQuestion} className="inline-flex justify-center cursor-pointer w-max text-gray-400 hover:text-indigo-600 hover:animate-pulse duration-300">
                <svg className="w-20 h-20 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </button>
            </div>
            {props.new ? 
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={saveQuiz(true)} type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create New Quiz
                </button>
            </div> :
            <div className="px-4 pt-3 text-center sm:px-6">
                <button onClick={saveQuiz(false)} type="submit" className="mx-4 w-48 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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