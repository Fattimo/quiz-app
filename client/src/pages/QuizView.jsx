import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

import Home from './Home'

function QuizView() {
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
          <Route path={`${match.path}/:topicId`}>
            <Topic />
          </Route>
          <Route path={match.path}>
            <Home />
          </Route>
        </Switch>
      </div>
    );
}
  
function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}

export default QuizView