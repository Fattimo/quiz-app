import {
    useRouteMatch,
    useParams,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import EditableQuizView from '../components/EditableQuizView'

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

    return (
      <EditableQuizView quizId={quizId} new={quizId==="new"}/>
    );
}

export default EditPage