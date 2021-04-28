import { useState } from 'react'
import { createContainer } from 'unstated-next'

const useEditQuizDetailsContainer = (
    initialTitle="Title",
    initialDescription="Description",
    initialColor="indigo",
    initialDifficulty="easy",
    ) => {
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription)
    const [color, setColor] = useState(initialColor)
    const [difficulty, setDifficulty] = useState(initialDifficulty)

    //array of keys for all of the questions, not needed?
    const [keys, setKeys] = useState([])

    //object storing all of the question data & responses
    
    return {
        title, setTitle,
        description, setDescription,
        color, setColor,
        difficulty, setDifficulty
    }
}

const EditQuizContainer = createContainer(useEditQuizDetailsContainer)

export default EditQuizContainer