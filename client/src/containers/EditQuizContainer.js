/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useRef } from 'react'
import { createContainer } from 'unstated-next'

const useEditQuizDetailsContainer = ({
    initialTitle="Title",
    initialDescription="Description",
    initialColor="indigo",
    initialDifficulty="easy",
    initialQuestions=[]}
    ) => {
    // headers
    const title = useRef(initialTitle)
    const description = useRef(initialDescription)

    const handleChange = property => e => {
        property.current = e.target.value
    }
    
    const color = useState(initialColor)
    const difficulty = useState(initialDifficulty)

    const labeler = useRef(-1)

    // Question
    /**
     * mapping of questionid: {
     * body: desc
     * points: num
     * correct: id ref resp id
     * responses {id:body}
     */
    //object storing all of the question data & responses
    const questions = {}
    
    for(const question of initialQuestions) {
        const referencedResponses = {}
        for (const responseId in question.responses) {
            referencedResponses[responseId] = useRef(question.responses[responseId])
        }
        questions[question.id]= {
            body: useRef(question.body),
            points: useState(question.points),
            correct: useState(question.correct),
            responses: referencedResponses
        }
    }

    const removedQuestions = []
    const removedResponses = []

    const useQuestionCreator = () => {
        const id = labeler.current
        questions[id] = {
            body: useRef("new question"),
            points: useState(1),
            correct: useState(labeler.current-1),
            responses: {
                [id-1]: useRef("new response")
            }
        }
        labeler.current-=2
        return [id, questions[id]]
    }

    const removeQuestion = (questionId) => {
        const omittedQuestion = questions[questionId]
        if (questionId > 0) {
            removedQuestions.push(questionId)
            for (const responseId in omittedQuestion) {
                if (responseId > 0) {
                    removedResponses.push(responseId)
                }
            }
        }
        delete questions[questionId]
    }

    const editQuestionPropertyRef = (property, questionId) => e => {
        questions[questionId][property].current = e.target.value
    }

    const getQuestionPropertyState = (property, questionId)  => {
        return questions[questionId][property]
    }

    const editResponse = (questionId, responseId) => e => {
        questions[questionId].responses[responseId].current = e.target.value
    }

    const questionStates = (questionId) => {
        return {
            body: [questions[questionId]["body"].current, editQuestionPropertyRef("body", questionId)],
            points: getQuestionPropertyState("points", questionId),
            correct: getQuestionPropertyState("correct", questionId),
            response: (responseId) => [questions[questionId].responses[responseId].current ,editResponse(questionId, responseId)]
        }
    }

    // Responses
    const useResponseCreator = (questionId) => {
        questions[questionId].responses[labeler.current] = useRef("new response")
        return labeler.current--
    }

    const removeResponse = (questionId, responseId) => {
        if (responseId > 0) {
            removedResponses.push(responseId)
        }
        delete questions[questionId].responses[responseId]
    }

    
    return {
        header: {
            title: [title, handleChange(title)],
            description: [description, handleChange(description)], 
            color, 
            difficulty
        },
        questionStates,
        useQuestionCreator,
        removeQuestion,
        useResponseCreator,
        removeResponse,
        questions,
        removedQuestions,
        removedResponses
    }
}

const EditQuizContainer = createContainer(useEditQuizDetailsContainer)

export default EditQuizContainer