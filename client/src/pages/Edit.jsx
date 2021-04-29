import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

import EditableQuizView from '../components/EditableQuizView'
import EditQuizContainer from '../containers/EditQuizContainer'

function EditPage() {
    useEffect(()=> {
      fetch('/api/hello', { method: "GET" })
        .then(res => res.json()
        .then(r => setState(r))
      )
    }, [])
  
    const [state, setState] = useState('')
  
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

    //query to get answer choices:
    const items = [{
      id: "123",
      body: "test",
      points: 10,
      correct: 123,
      responses: {
          123: "125",
          223: "1",
          313: "true"
      }
  },
  {
      id: "456",
      body: "test",
      points: 10,
      correct: 123,
      responses: {
          123: "125",
          223: "1",
          313: "true"
      }
  }]

    return (
      <EditQuizContainer.Provider 
      initialState={{
        initialQuestions: items
      }}>
        <EditableQuizView quizId={quizId}/>
      </EditQuizContainer.Provider>
    );
}

export default EditPage