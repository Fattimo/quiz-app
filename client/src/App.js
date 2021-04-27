import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Edit from './pages/Edit';
import Nav from './components/Nav';
import Quiz from './pages/Quizzes';

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Switch>
          <Route path="/edit">
            <Edit/>
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
