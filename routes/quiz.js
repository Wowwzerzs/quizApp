const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");
const { getQuizQuestionByID } = require("../db/queries/quiz");
const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

// router.get("/:id", (req, res) => {
//   const { userId } = req.session;
//   const { id: quizId } = req.params;

//   getUsers().then((user) => {
//     const currentUser = findUserById(userId, user);
//     getQuizQuestionByID(quizId).then((data) => {
//       console.log(data);

//       const questionsOnly = data.map((quiz) => {
//         return quiz.question;
//       });

//       console.log(questionsOnly);

//       const templateVars = { user: currentUser[0], questions: questionsOnly };
//       res.render("urls_questions", templateVars);
//     });
//   });
// });

router.get("/:id", async (req, res) => {
  const { userId } = req.session;
  const { id: quizId } = req.params;

  const [user, questionsObj] = await Promise.all([
    getUsers(),
    getQuizQuestionByID(quizId),
  ]);
  const currentUser = findUserById(userId, user);

  const questionsOnly = questionsObj.map((quiz) => {
    return quiz.question;
  });

  const templateVars = { user: currentUser[0], questions: questionsOnly };
  res.render("urls_questions", templateVars);
});

module.exports = router;
