DROP TABLE IF EXISTS quiz_answers CASCADE;

CREATE TABLE quiz_answers (
  id SERIAL PRIMARY KEY,
  quiz_answer_id INTEGER REFERENCES quiz_questions(id) ON DELETE CASCADE,
  answer VARCHAR(255) NOT NULL,
  correct BOOLEAN NOT NULL DEFAULT FALSE
);