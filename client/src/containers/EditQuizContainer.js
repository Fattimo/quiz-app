import { useRef } from 'react'
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
    const color = useRef(initialColor)
    const difficulty = useRef(initialDifficulty)

    const handleChange = (ref) => (value) => {
        ref.current = value;
        return value;
    }

    const getValue = (ref) => {
        return ref.current
    }

    const makeHeaderGetters = () => {
        return {
            title: getValue(title),
            description: getValue(description), 
            color: getValue(color),
            difficulty: getValue(difficulty)
        }
    }

    const makeHeaderSetters = () =>{
        return {
            title: handleChange(title),
            description: handleChange(description), 
            color: handleChange(color), 
            difficulty: handleChange(difficulty)
        }
    }

    const labeler = useRef(-1)

    // Question
    /**
     * mapping of questionid: {
     * body: desc
     * points: num
     * 
     * responses {id:{body: string, correct: boolean}}
     */
    //object storing all of the question data & responses
    const questions = useRef({})

    const setInitialValues = (header, initQs) => {
        if (header) {
            title.current = header.title
            description.current = header.body
            color.current = header.color
            difficulty.current = header.difficulty
        }
        if (initQs) {
            for(const question of initQs) {
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
                    body: question.body,
                    points: question.points,
                    correct: correctId,
                    responses: referencedResponses
                }
            }
        }
    }

    const removedQuestions = []
    const removedResponses = []

    const addQuestion = () => {
        const id = labeler.current
        questions.current[id] = {
            body: "new question",
            points: 1,
            correct: id-1,
            responses: {
                [id-1]: {
                    body: "new response",
                    correct: true
                }
            }
        }
        labeler.current-=2
        return [id, questions.current[id]]
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

    const getQuestionProperty = (property, questionId)  => {
        return questions.current[questionId][property]
    }

    const editQuestionProperty = (property, questionId) => value => {
        questions.current[questionId][property] = value
        return value
    }

    const getResponse = (questionId, responseId)  => {
        return questions.current[questionId].responses[responseId]
    }

    const editResponse = (questionId, responseId) => value => {
        questions.current[questionId].responses[responseId].body = value
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
        questions.current[questionId].responses[labeler.current] = {
            body: "new response",
            correct: false
        }
        return labeler.current--
    }

    const removeResponse = (questionId) => (responseId) => {
        if (responseId > 0) {
            removedResponses.push(responseId)
        }
        delete questions.current[questionId].responses[responseId]
        return responseId
    }

    
    return {
        headerGetters: makeHeaderGetters,
        headerSetters: makeHeaderSetters(),
        questionPropertyGetters,
        questionPropertySetters,
        addQuestion,
        removeQuestion,
        addResponse,
        removeResponse,
        questions: getValue(questions),
        removedQuestions,
        removedResponses,
        setInitialValues
    }
}

const EditQuizContainer = createContainer(useEditQuizDetailsContainer)

export default EditQuizContainer