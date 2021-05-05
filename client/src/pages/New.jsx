import EditableQuizView from '../components/EditableQuizView'

function NewPage() {  
    return (
        <Quiz />
    );
}
  
function Quiz() {
    return (
      <EditableQuizView quizId={"new"} new={true}/>
    );
}

export default NewPage