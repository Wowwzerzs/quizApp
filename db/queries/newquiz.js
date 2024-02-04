const db = require('../connection');

// Creates a new question for a quiz.
// Returns a promise that resolves to the created question object.
const createQuestion = function (quizId, question) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO quiz_questions (quiz_id, question)
      VALUES ($1, $2)
      RETURNING *;`;

    const params = [quizId, question];

    db.query(query, params)
      .then(data => {
        resolve(data.rows[0]);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Inserts an answer for a question.
// Returns a promise that resolves to the inserted answer object.
const insertAnswer = function (questionId, answer, isCorrect) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO quiz_answers (quiz_answer_id, answer, correct)
      VALUES ($1, $2, $3)
      RETURNING *;`;

    const params = [questionId, answer, isCorrect];

    db.query(query, params)
      .then(data => {
        resolve(data.rows[0]);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Creates a new quiz along with its questions and answers.
const createNewQuiz = async function (userId, quizTitle, generatorObj, privacy) {
  try {
    const query = `
      INSERT INTO quizzes (quiz_owner_id, title, public)
      VALUES ($1, $2, $3)
      RETURNING id;`;

    const params = [userId, quizTitle, privacy];

    const data = await db.query(query, params);

    const quizId = data.rows[0].id;

    // Iterate through the generator object and create a new question for each item
    for (const question of generatorObj.questions) {
      const questionData = await createQuestion(quizId, question.question);
      const questionId = questionData.id;

      // Iterate through the answers of each question and insert them
      for (const answer of question.answers) {
        const isCorrect = answer === question.correctAnswer;
        await insertAnswer(questionId, answer, isCorrect);
      }
    }

  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createQuestion,
  insertAnswer,
  createNewQuiz
};
