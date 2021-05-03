CREATE TYPE difficulties AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE colors AS ENUM ('gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink');

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    last_updated TIMESTAMP,
    difficulty difficulties,
    body TEXT,
    color colors,
    num_questions INT DEFAULT 0,
    likes INT DEFAULT 0,
    --Put in the table, but doesn't actually do anything, for PHASE 2--
    liked_user_ids INT[] DEFAULT ARRAY[]::INT[]
    --Not implemented, for PHASE 2--
    -- creator INT REFERENCES users(username) DEFAULT "Anonymous",
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(id),
    body TEXT,
    points INT DEFAULT 1
);

CREATE TABLE question_answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    body TEXT,
    correct BOOLEAN
);

--Phase 2 Schemas--

-- CREATE TABLE question_response (
--     id SERIAL PRIMARY KEY,
--     quiz_response_id INT REFERENCES quiz_response(id),
--     question_id INT REFERENCES questions(id),
--     answer_id INT REFERENCES question_answers(id)
-- );

-- CREATE TABLE quiz_response (
--     id SERIAL PRIMARY KEY,
--     quiz_id INT REFERENCES quizzes(id),
--     score INT
-- );

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) UNIQUE
-- );