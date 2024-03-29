// Import the database connection module
const db = require('../connection');

// Retrieve users with the most created quizzes
const mostCreated = function () {
  return db.query(`
    SELECT name, COUNT(quiz_owner_id) AS count
    FROM users
    JOIN quizzes ON users.id = quizzes.quiz_owner_id
    GROUP BY name
    ORDER BY count DESC
    LIMIT 5;
  `)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// Retrieve users who have taken the most quizzes
const mostTaken = function () {
  return db.query(`
    SELECT name, COUNT(quiz_id) AS count
    FROM users
    JOIN quiz_attempts ON users.id = quiz_attempts.user_id
    GROUP BY name
    ORDER BY count DESC
    LIMIT 5;
  `)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// Retrieve the most popular quizzes
const mostPopular = function () {
  return db.query(`
    SELECT title, COUNT(quiz_id) AS count, quizzes.id
    FROM quizzes
    JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
    GROUP BY title, quizzes.id
    ORDER BY count DESC
    LIMIT 5;
  `)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// Retrieve the most difficult quizzes based on average score after 5 attempts
const mostDifficult = function () {
  return db.query(`
    SELECT title, COUNT(quiz_attempts.quiz_id) AS count, ROUND((AVG(quiz_attempts.quiz_result) / COUNT(DISTINCT quiz_questions.question)) * 100) AS avg_percentage, quizzes.id
    FROM quizzes
    JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
    JOIN quiz_questions ON quizzes.id = quiz_questions.quiz_id
    GROUP BY title, quizzes.id
    HAVING COUNT(quiz_attempts.quiz_id) >= 5
    ORDER BY avg_percentage ASC
    LIMIT 5;
  `)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { mostCreated, mostTaken, mostPopular, mostDifficult };
