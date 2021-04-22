CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard')

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    last_updated DATE,
    quiz_difficulty difficulty,
    body TEXT,
    num_questions INT DEFAULT 0
)

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id),
    body TEXT,
    points INT
)

CREATE TABLE question_answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    label CHARACTER(1),
    body TEXT,
    correct BOOLEAN
)

CREATE TABLE question_response (
    id SERIAL PRIMARY KEY,
    quiz_response_id INT REFERENCES quiz_response(id),
    question_id INT REFERENCES questions(id),
    answer_id INT REFERENCES question_answers(id)
)

CREATE TABLE quiz_response (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id),
    score INT
)

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE
)