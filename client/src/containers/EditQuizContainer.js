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
            referencedResponses[responseId] = question.responses[responseId]
        }
        questions[question.id]= {
            body: question.body,
            points: question.points,
            correct: question.correct,
            responses: referencedResponses
        }
    }

    const removedQuestions = []
    const removedResponses = []

    const addQuestion = () => {
        const id = labeler.current
        questions[id] = {
            body: "new question",
            points: 1,
            correct: labeler.current-1,
            responses: {
                [id-1]: "new response"
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
        return questionId
    }

    const getQuestionProperty = (property, questionId)  => {
        return questions[questionId][property]
    }

    const editQuestionProperty = (property, questionId) => value => {
        questions[questionId][property] = value
        return value
    }

    const getResponse = (questionId, responseId)  => {
        return questions[questionId].responses[responseId]
    }

    const editResponse = (questionId, responseId) => value => {
        questions[questionId].responses[responseId] = value
        return value
    }

    const questionPropertyGetters = (questionId) => {
        return {
            body: getQuestionProperty("body", questionId),
            points: getQuestionProperty("points", questionId),
            correct: getQuestionProperty("correct", questionId),
            response: (responseId) => getResponse(questionId, responseId)
        }
    }

    const questionPropertySetters = (questionId) => {
        return {
            body: editQuestionProperty("body", questionId),
            points: editQuestionProperty("points", questionId),
            correct: editQuestionProperty("correct", questionId),
            response: (responseId) => editResponse(questionId, responseId)
        }
    }

    // Responses
    const addResponse = (questionId) => () => {
        questions[questionId].responses[labeler.current] = "new response"
        return labeler.current--
    }

    const removeResponse = (questionId, responseId) => {
        if (responseId > 0) {
            removedResponses.push(responseId)
        }
        delete questions[questionId].responses[responseId]
        return responseId
    }

    const getQuestions = () => {
        return questions
    }

    
    return {
        header: {
            title: [title, handleChange(title)],
            description: [description, handleChange(description)], 
            color, 
            difficulty
        },
        questionPropertyGetters,
        questionPropertySetters,
        addQuestion,
        removeQuestion,
        addResponse,
        removeResponse,
        questions: getQuestions(),
        removedQuestions,
        removedResponses
    }
}

const EditQuizContainer = createContainer(useEditQuizDetailsContainer)

export default EditQuizContainer