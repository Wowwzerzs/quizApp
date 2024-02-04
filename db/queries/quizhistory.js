const db = require('../connection');

// Retrieves quiz history for a user based on user ID
const getQuizHistoryforUser = function (userId) {
  return db.query(`
    SELECT quizzes.title, quiz_attempts.quiz_result, ROUND((AVG(quiz_attempts.quiz_result) / quiz_questions.total_questions) * 100) AS avg_percentage, total_questions, quiz_attempts.id
    FROM quizzes
    JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
    JOIN users ON quizzes.quiz_owner_id = users.id
    JOIN (
      SELECT quiz_id, COUNT(question) AS total_questions
      FROM quiz_questions
      GROUP BY quiz_id
    ) AS quiz_questions ON quizzes.id = quiz_questions.quiz_id
    WHERE user_id = $1
    GROUP BY quizzes.title, quiz_attempts.quiz_result, quiz_questions.total_questions, quiz_attempts.id;
  `, [userId])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getQuizHistoryforUser };