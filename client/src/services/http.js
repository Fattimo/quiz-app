export const getAllQuestions = () => {
    //query to get answer choices:
    const items = [{
        id: 123,
        body: "test",
        points: 7,
        correct: 123,
        responses: {
            123: "125",
            223: "1",
            313: "not a boolean what"
        }
    },
    {
        id: 456,
        body: "test data num 2",
        points: 10,
        correct: 313,
        responses: {
            123: "125",
            223: "1",
            313: "trsewggerwe"
        }
    }]
    return items
}