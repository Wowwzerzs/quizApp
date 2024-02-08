const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");
const {
  getQuizQuestionByID,
  getAnswersByQuestionId,
} = require("../db/queries/quiz");
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
  try {
    const { userId } = req.session;
    const { id: quizId } = req.params;

    const [user, questionsObj] = await Promise.all([
      getUsers(),
      getQuizQuestionByID(quizId),
      // getAnswersByQuestionId(),
    ]);

    const [questionsIdOne, questionsIdTwo, questionsIdThree] = questionsObj.map(
      (user) => user.id
    );

    const answersToQ1 = await getAnswersByQuestionId(questionsIdOne);
    const answersToQ2 = await getAnswersByQuestionId(questionsIdTwo);
    const answersToQ3 = await getAnswersByQuestionId(questionsIdThree);
    // console.log(answersToQ1);
    const answersOnlyToOne = answersToQ1.map((question) => question.answer);
    const answersOnlyToTwo = answersToQ2.map((question) => question.answer);
    const answersOnlyToThree = answersToQ3.map((question) => question.answer);

    const currentUser = findUserById(userId, user);

    const questionsOnly = questionsObj.map((quiz) => {
      return quiz.question;
    });

    // console.log(questionsObj);
    // const answersOnly = answers.map((answers) => {

    //   return answers.answer;
    // });
    // console.log(answersOnly);

    // console.log(answers);
    const templateVars = {
      user: currentUser[0],
      questions: questionsOnly,
      answersOne: answersOnlyToOne,
      answersTwo: answersOnlyToTwo,
      answersThree: answersOnlyToThree,
    };

    res.render("urls_questions", templateVars);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
