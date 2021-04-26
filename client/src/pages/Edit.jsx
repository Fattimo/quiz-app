import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

import Questions from './QuizView/Questions'

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
      <div>
        <h3>Requested topic ID: {quizId}</h3>
        <Questions />
        <div className="px-4 pt-3 text-center sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
            </button>
        </div>
      </div>
    );
}

export default EditPage