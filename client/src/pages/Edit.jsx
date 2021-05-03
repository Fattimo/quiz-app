import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import EditableQuizView from '../components/EditableQuizView'
import EditQuizContainer from '../containers/EditQuizContainer'
import { getAllQuestions, getQuiz, getQuizQuestions } from '../services/http'

function EditPage() {  
    let match = useRouteMatch();
  
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:quizId`}>
            <Quiz />
          </Route>
          <Route path={match.path}>
            <Redirect to="/quizzes" />
          </Route>
        </Switch>
      </div>
    );
}
  
function Quiz() {
    let { quizId } = useParams();
    const [questions, setQuestions] = useState()
    const [quiz, setQuiz] = useState()

    useEffect(() => {
      if (quizId === "new") {
        setQuestions(getAllQuestions())
        return
      }
      const fetchData = async () => {
        const [quizDetails, quizQuestions] = await Promise.all([getQuiz(parseInt(quizId)), getQuizQuestions(parseInt(quizId))])
        setQuestions(quizQuestions.data)
        setQuiz(quizDetails.data[0])
      }
      fetchData()
    }, [quizId])

    return (
      <EditQuizContainer.Provider 
      initialState={{
        initialQuestions: questions
      }}>
        <EditableQuizView quizId={quizId} new={quizId==="new"} header={quiz} questions={questions}/>
      </EditQuizContainer.Provider>
    );
}

export default EditPage