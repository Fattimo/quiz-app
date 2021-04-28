import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'

import Home from './Home'
import QuizView from '../components/QuizView'
import QuizContainer from '../containers/QuizContainer'

function Quizzes() {  
    let match = useRouteMatch();
  
    return (
      <div>
        <Switch>
          <Route path={`${match.path}/:topicId`}>
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
    let { topicId } = useParams();
    return (
      <QuizContainer.Provider>
        <QuizView topicId={topicId} />
      </QuizContainer.Provider>
    );
}

export default Quizzes