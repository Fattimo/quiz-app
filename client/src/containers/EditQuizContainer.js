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
            points: useRef(question.points),
            correct: useRef(question.correct),
            responses: referencedResponses
        }
    }

    const removedQuestions = []
    const removedResponses = []

    const useQuestionCreator = () => {
        const id = labeler.current
        questions[id] = {
            body: useRef("new question"),
            points: useRef(1),
            correct: useRef(labeler.current-1),
            responses: {
                [id-1]: useRef("new response")
            }
        }
        labeler.current-=2
        return id
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

    const editQuestionProperty = (property, questionId) => value => {
        questions[questionId][property].current = value
    }

    const editResponse = questionId => responseId => value => {
        questions[questionId].responses[responseId].current = value
    }

    const editors = (questionId) => {
        return {
            body: editQuestionProperty("body", questionId),
            points: editQuestionProperty("points", questionId),
            correct: editQuestionProperty("correct", questionId),
            response: editResponse(questionId)
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
        editors,
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