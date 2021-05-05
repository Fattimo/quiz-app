var express = require('express')
var router = express.Router()
var pool = require('./db')

/**
 * Quizzes Routes
 */

router.get('/api/get/allquizzespaginated', (req, res, next ) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 5
  pool.query(`SELECT * FROM quizzes 
              ORDER BY last_updated DESC
              LIMIT $1 OFFSET $2`, [ limit, page * limit ],
            (q_err, q_res) => {
            res.json({
                quizzes: q_res.rows,
                page: page,
                isLastPage: q_res.rows.length < limit
            })
  })
})

router.get('/api/get/quiz', (req, res, next) => {
  const quiz_id = req.query.quiz_id

  pool.query(`SELECT * FROM quizzes
              WHERE id=$1`,
            [ quiz_id ], (q_err, q_res) => {
                res.json(q_res.rows)
      })
} )


router.post('/api/post/createquiz', (req, res, next) => {
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
          if(q_err) res.status(400)
          res.json(q_res.rows)
    })
})

router.put('/api/put/quiz', (req, res, next) => {
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
                res.json(q_res.rows)
                console.log(q_err)
        })
})

router.delete('/api/delete/quizquestionanswers', (req, res, next) => {
    const quiz_id=req.body.quiz_id
    pool.query(`DELETE FROM question_answers
                WHERE question_id IN 
                (SELECT id FROM questions WHERE quiz_id=$1)`, [ quiz_id ],
                (q_err, q_res) => {
                    res.json(q_res.rows)
                    console.log(q_err)
                }
            )
})

router.delete('/api/delete/quizquestions', (req, res, next) => {
  const quiz_id = req.body.quiz_id
  pool.query(`DELETE FROM questions
              WHERE quiz_id = $1`, [ quiz_id ],
              (q_err, q_res) => {
                  res.json(q_res.rows)
                  console.log(q_err)
        })
})

router.delete('/api/delete/quiz', (req, res, next) => {
  const quiz_id = req.body.quiz_id
  pool.query(`DELETE FROM quizzes WHERE id = $1`, [ quiz_id ],
              (q_err, q_res) => {
                res.json(q_res.rows)
                console.log(q_err)
       })
})

router.put('/api/put/likes', (req, res, next) => {
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
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

router.put('/api/put/unlike', (req, res, next) => {
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
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

/**
 * Question Routes
 */

router.post('/api/post/createquestion', (req, res, next) => {
  const values = [ 
    req.body.body, 
    req.body.points, 
    req.body.quiz_id
]

  pool.query(`INSERT INTO questions(body, points, quiz_id)
              VALUES($1, $2, $3)
              RETURNING id`, values,
              (q_err, q_res ) => {
                  res.json(q_res.rows)
                  console.log(q_err)
      })
})

router.put('/api/put/question', (req, res, next) => {
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
                  res.json(q_res.rows)
                  console.log(q_err)
      })
})

router.delete('/api/delete/questionanswers', (req, res, next) => {
    const question_id = req.body.question_id
    pool.query(`DELETE FROM question_answers
                WHERE question_id = $1`, [ question_id ],
                (q_err, q_res) => {
                    res.json(q_res.rows)
                    console.log(q_err)
          })
  })

router.delete('/api/delete/question', (req, res, next) => {
  const id = req.body.question_id
  pool.query(`DELETE FROM questions
              WHERE id=$1`, [ id ],
              (q_err, q_res ) => {
                  res.json(q_res)
                  console.log(q_err)
      })
})


router.get('/api/get/allquestions', (req, res, next) => {
  const quiz_id = parseInt(req.query.quiz_id)
  pool.query(`
  (SELECT q.id, q.quiz_id, q.body, q.points, 
    (SELECT json_agg(ans) FROM (SELECT * FROM question_answers WHERE question_id=q.id) ans)
    as responses, (select id from question_answers where question_id=q.id and correct) as correct
  from questions as q where quiz_id=$1)`, [ quiz_id ],
              (q_err, q_res ) => {
                  res.json(q_res.rows)
      })
})

/**
 * Question_Answer Routes (referenced as question responses on frontend)
 */

router.post('/api/post/createanswer', (req, res, next) => {
  const values = [
    req.body.question_id, 
    req.body.body, 
    req.body.correct, 
  ]
  pool.query(`INSERT INTO question_answers(question_id, body, correct)
              VALUES($1, $2, $3)
              ON CONFLICT DO NOTHING`, values,
              (q_err, q_res) => {
                res.json(q_res.rows)
      })
} )

router.put('/api/put/answer', (req, res, next) => {
    const values = [
        req.body.question_id,
        req.body.body,
        req.body.correct, 
        req.body.response_id
    ]
    console.log(values)
    pool.query(`UPDATE question_answers SET body=$2, question_id=$1, correct=$3
        WHERE id=$4
        RETURNING id`, values,
        (q_err, q_res) => {
          console.log(q_res)
            res.json(q_res.rows)
            console.log(q_err)
        })
})

router.delete('/api/delete/answer', (req, res, next) => {
    const answer_id = req.body.answer_id
    pool.query(`DELETE FROM question_answers
        WHERE id=$1`, [ answer_id ],
        (q_err, q_res) => {
            res.json(q_res.rows)
            console.log(q_err)
        })
})

module.exports = router