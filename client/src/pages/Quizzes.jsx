import {
    useRouteMatch,
    useParams,
    Switch,
    Route
} from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './Home'
import QuizView from '../components/QuizView'
import QuizContainer from '../containers/QuizContainer'
import { getAllQuestions, getQuiz, getQuizQuestions } from '../services/http'

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
    const [questions, setQuestions] = useState([])
    const [quiz, setQuiz] = useState({})

    useEffect(() => {
      const fetchData = async () => {
        const [quizDetails, quizQuestions] = await Promise.all([getQuiz(parseInt(topicId)), getQuizQuestions(parseInt(topicId))])
        setQuestions(quizQuestions.data)
        setQuiz(quizDetails.data[0])
      }
      fetchData()
    }, [topicId])

    return (
      <QuizContainer.Provider>
        <QuizView topicId={topicId} header={quiz} questions={questions}/>
      </QuizContainer.Provider>
    );
}

export default Quizzes