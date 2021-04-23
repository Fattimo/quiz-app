import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/QuizView';

function App() {
  return (
    <Router>
      <div>
        <div className="flex justify-around">
          <div>
            <Link to="/">Take a Quiz</Link>
          </div>
          <div>
            <Link to="/edit">Edit Quizzes</Link>
          </div>
        </div>

        <Switch>
          <Route path="/edit">
            <Home edit={true} />
          </Route>
          <Route path="/quizzes">
            <Quiz />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
