import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

import Questions from '../components/Questions'
import EditableQuizView from '../components/EditableQuizView'

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
    return (
      <EditableQuizView quizId={quizId}/>
    );
}

export default EditPage