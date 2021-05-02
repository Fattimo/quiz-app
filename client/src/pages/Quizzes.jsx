import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'

import Home from './Home'
import QuizView from '../components/QuizView'
import QuizContainer from '../containers/QuizContainer'
import { getAllQuestions } from '../services/http'

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

    const items = getAllQuestions()

    return (
      <QuizContainer.Provider>
        <QuizView topicId={topicId} questions={items}/>
      </QuizContainer.Provider>
    );
}

export default Quizzes