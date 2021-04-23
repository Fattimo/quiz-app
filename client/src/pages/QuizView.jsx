import { useEffect, useState } from 'react'
import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'
import fetch from 'isomorphic-unfetch'

import Home from './Home'
import InfiniteQuestionScroll from './QuizView/InfiniteQuestionScroll'

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
    return (
      <div>
        <h3>Requested topic ID: {topicId}</h3>
        <InfiniteQuestionScroll />
        <div className="px-4 pt-3 text-center sm:px-6">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
            </button>
        </div>
      </div>
      
    );
}

export default QuizView