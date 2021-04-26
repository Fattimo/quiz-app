import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import EditPage from './pages/Edit';
import Home from './pages/Home'
import Nav from './pages/Nav';
import Quiz from './pages/QuizView';

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route path="/edit">
            <EditPage/>
          </Route>
          <Route path="/quizzes">
            <Quiz />
          </Route>
          <Route path="/">
            <Redirect to="/quizzes" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
