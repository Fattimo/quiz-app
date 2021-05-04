import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'

import Home from './Home'
import QuizView from '../components/QuizView'


function Quizzes() {  
    let match = useRouteMatch();
  
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:quizId`}>
            <Quiz />
          </Route>
          <Route path={match.path}>
            <Home />
          </Route>
        </Switch>
      </div>
    );
}
  
function Quiz() {
    let { quizId } = useParams();

    return (
      <QuizView quizId={quizId} />
    );
}

export default Quizzes