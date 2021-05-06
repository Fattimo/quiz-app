var express = require('express')
var router = express.Router()
const {check, validationResult} = require('express-validator')

var pool = require('./db')

const errHandling = (q_err, q_res, res) => {
  if (q_err) {
    res.status(400).json({errors: q_err})
    return true
  }
  if (!('rows' in q_res)) {
    res.status(400).json({message: "The query was invalid"})
    return true
  }
  return false
}

const validationHandling = (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()})
    return true
  }
  return false
}

/**
 * Quizzes Routes
 */

const COLORS = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
const DIFFICULTIES = ['easy', 'medium', 'hard']
const quizCheck = [
  check('title').notEmpty().isLength({max: 255}).withMessage("Title is too long").trim(),
  check('body').trim(),
  check('difficulty').toLowerCase().isIn(DIFFICULTIES).withMessage("Not a valid difficulty"),
  check('color').toLowerCase().isIn(COLORS).withMessage("Not a valid color"),
  check('num_questions').isNumeric().withMessage("Question number not a valid number")
]

const checkQuizId = check("quiz_id").isNumeric().withMessage("Id isn't numeric")

router.get('/api/get/allquizzespaginated', (req, res, next ) => {
  const page = parseInt(req.query.page) || 0
  const limit = parseInt(req.query.limit) || 5
  pool.query(`SELECT * FROM quizzes 
    ORDER BY last_updated DESC
    LIMIT $1 OFFSET $2`, [ limit, page * limit ],
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json({
        quizzes: q_res.rows,
        page: page,
        isLastPage: q_res.rows.length < limit
      })
  })
})

router.get('/api/get/quiz',
  checkQuizId,
  (req, res, next) => {
    if (validationHandling(req, res)) return
    const quiz_id = req.query.quiz_id
    pool.query(`SELECT * FROM quizzes
      WHERE id=$1`,
      [ quiz_id ], 
      (q_err, q_res) => {
        if (errHandling(q_err, q_res, res)) return
        res.json(q_res.rows)
      }
    )
})

router.post('/api/post/createquiz', 
  quizCheck,
  (req, res, next) => {
    if (validationHandling(req, res)) return
    const values = [ 
      req.body.title, 
      req.body.body,
      req.body.difficulty, 
      req.body.color,
      req.body.num_questions
    ]
    pool.query(`INSERT INTO quizzes(title, body, difficulty, color, num_questions, last_updated)
      VALUES($1, $2, $3, $4, $5, NOW() )
      RETURNING id`,
      values, (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    })
})

router.put('/api/put/quiz',
  quizCheck,
  checkQuizId,
 (req, res, next) => {
  if (validationHandling(req, res)) return
  const values = [ 
    req.body.title,
    req.body.body, 
    req.body.difficulty, 
    req.body.color, 
    req.body.num_questions,
    req.body.quiz_id
  ]
  pool.query(`UPDATE quizzes SET title=$1, body=$2, difficulty=$3, color=$4, num_questions=$5, last_updated=NOW()
    WHERE id = $6
    RETURNING id`, values,
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    })
})

router.delete('/api/delete/quizquestionanswers',
checkQuizId,
 (req, res, next) => {
  if (validationHandling(req, res)) return
  const quiz_id=req.body.quiz_id
  pool.query(`DELETE FROM question_answers
    WHERE question_id IN 
    (SELECT id FROM questions WHERE quiz_id=$1)`, [ quiz_id ],
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    }
  )
})

router.delete('/api/delete/quizquestions',
  checkQuizId,
 (req, res, next) => {
  if (validationHandling(req, res)) return
  const quiz_id = req.body.quiz_id
  pool.query(`DELETE FROM questions
    WHERE quiz_id = $1`, [ quiz_id ],
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    }
  )
})

router.delete('/api/delete/quiz',
  checkQuizId,
 (req, res, next) => {
  if (validationHandling(req, res)) return
  const quiz_id = req.body.quiz_id
  pool.query(`DELETE FROM quizzes WHERE id = $1`, [ quiz_id ],
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    })
})

router.put('/api/put/likes', checkQuizId, (req, res, next) => {
  if (validationHandling(req, res)) return
  const uid = req.body.uid
  const quiz_id = req.body.quiz_id
  const values = [ quiz_id ]
  pool.query(
    `UPDATE quizzes
    SET likes = likes + 1
    WHERE id = $1
    RETURNING likes`,
              // `UPDATE quizzes
              // SET like_user_id = like_user_id || $1, likes = likes + 1
              // WHERE NOT (like_user_id @> $1)
              // AND id = ($2)
              // RETURNING likes`,
  values, (q_err, q_res) => {
    if (errHandling(q_err, q_res, res)) return
    res.json(q_res.rows);
  });
});

router.put('/api/put/unlike', checkQuizId, (req, res, next) => {
  if (validationHandling(req, res)) return
  const uid = req.body.uid
  const quiz_id = req.body.quiz_id

  const values = [ quiz_id ]
  pool.query(
    `UPDATE quizzes
    SET likes = likes - 1
    WHERE id = ($1)
    RETURNING likes`,
              // `UPDATE quizzes
              // SET like_user_id = like_user_id || $1, likes = likes + 1
              // WHERE NOT (like_user_id @> $1)
              // AND id = ($2)
              // RETURNING likes`,
    values, (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows);
  });
});

/**
 * Question Routes
 */

const questionCheck = [
  check('body').trim(),
  check('points').isNumeric().withMessage("Question number not a valid number"),
  check('quiz_id').isNumeric().withMessage("quiz id is not numeric")
]

const checkQuestionId = check("question_id").isNumeric().withMessage("question Id isn't numeric")

router.post('/api/post/createquestion', questionCheck, (req, res, next) => {
  if (validationHandling(req, res)) return
  const values = [ 
    req.body.body, 
    req.body.points, 
    req.body.quiz_id
  ]
  pool.query(`INSERT INTO questions(body, points, quiz_id)
    VALUES($1, $2, $3)
    RETURNING id`, values,
    (q_err, q_res ) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
  })
})

router.put('/api/put/question', checkQuestionId, questionCheck, (req, res, next) => {
  if (validationHandling(req, res)) return
  const values = [ 
    req.body.body,
    req.body.points, 
    req.body.quiz_id, 
    req.body.question_id
  ]
  pool.query(`UPDATE questions SET body = $1, points = $2, quiz_id = $3
    WHERE id=$4
    RETURNING id`, values,
    (q_err, q_res ) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
  })
})

router.delete('/api/delete/questionanswers', checkQuestionId, (req, res, next) => {
  if (validationHandling(req, res)) return
  const question_id = req.body.question_id
  pool.query(`DELETE FROM question_answers
    WHERE question_id = $1`, [ question_id ],
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
  })
})

router.delete('/api/delete/question', checkQuestionId, (req, res, next) => {
  if (validationHandling(req, res)) return
  const id = req.body.question_id
  pool.query(`DELETE FROM questions
    WHERE id=$1`, [ id ],
  (q_err, q_res ) => {
    if (errHandling(q_err, q_res, res)) return
    res.json(q_res)     
  })
})


router.get('/api/get/allquestions', checkQuizId, (req, res, next) => {
  if (validationHandling(req, res)) return
  const quiz_id = req.query.quiz_id
  pool.query(`
  (SELECT q.id, q.quiz_id, q.body, q.points, 
    (SELECT json_agg(ans) FROM (SELECT * FROM question_answers WHERE question_id=q.id) ans)
    as responses, (select id from question_answers where question_id=q.id and correct) as correct
  from questions as q where quiz_id=$1)`,
  [ quiz_id ], (q_err, q_res ) => {
    if (errHandling(q_err, q_res, res)) return
    res.json(q_res.rows)
  })
})

/**
 * Question_Answer Routes (referenced as question responses on frontend)
 */

const responseCheck = [
  check('body').trim(),
  check('correct').isBoolean().withMessage("correct is not a boolean on answer property"),
  check('question_id').isNumeric().withMessage("question id is not numeric")
]

const checkResponseId = check("response_id").isNumeric().withMessage("response Id isn't numeric")

router.post('/api/post/createanswer', responseCheck, (req, res, next) => {
  if (validationHandling(req, res)) return
  const values = [
    req.body.question_id, 
    req.body.body, 
    req.body.correct, 
  ]
  pool.query(`INSERT INTO question_answers(question_id, body, correct)
    VALUES($1, $2, $3)
    ON CONFLICT DO NOTHING`, values,
    (q_err, q_res) => {
      if (errHandling(q_err, q_res, res)) return
      res.json(q_res.rows)
    })
})

router.put('/api/put/answer', responseCheck, checkResponseId, (req, res, next) => {
  if (validationHandling(req, res)) return
    const values = [
        req.body.question_id,
        req.body.body,
        req.body.correct, 
        req.body.response_id
    ]
    pool.query(`UPDATE question_answers SET body=$2, question_id=$1, correct=$3
      WHERE id=$4
      RETURNING id`, values,
      (q_err, q_res) => {
        if (errHandling(q_err, q_res, res)) return
        res.json(q_res.rows)
      })
})

router.delete('/api/delete/answer',
  check("answer_id").isNumeric().withMessage("response Id isn't numeric"),
  (req, res, next) => {
    if (validationHandling(req, res)) return
    const answer_id = req.body.answer_id
    pool.query(`DELETE FROM question_answers
      WHERE id=$1`, [ answer_id ],
      (q_err, q_res) => {
        if (errHandling(q_err, q_res, res)) return
        res.json(q_res.rows)
      })
})

module.exports = router