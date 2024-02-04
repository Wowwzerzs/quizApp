const db = require('../connection');

// Retrieve quizzes created by a specific user
const myQuizzes = function (userId) {
  return db.query(`
    SELECT quizzes.id, quizzes.title, quizzes.public
    FROM quizzes
    JOIN users ON users.id = quizzes.quiz_owner_id
    WHERE quizzes.quiz_owner_id = $1
    ORDER BY quizzes.id ASC;
  `, [userId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// Delete a quiz by its ID
const deleteQuiz = function (quizId) {
  return db.query(`
    DELETE
    FROM quizzes
    WHERE quizzes.id = $1;
  `, [quizId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

// Toggle the privacy setting of a quiz
const toggleQuizPrivacy = function (quizId, isPublic) {
  return db.query(`
    UPDATE quizzes
    SET public = $1
    WHERE quizzes.id = $2
  `, [isPublic, quizId])
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { myQuizzes, deleteQuiz, toggleQuizPrivacy };
