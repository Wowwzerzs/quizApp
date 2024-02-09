const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");
const {
  getQuizQuestionByID,
  getAnswersByQuestionId,
  getQuizById,
} = require("../db/queries/quiz");

const {
  getResultByUserIdAndQuizId,
  updateScore,
} = require("../db/queries/results");
const { route } = require("./users");

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

    const answersOnlyToOneBoolean = answersToQ1.map(
      (question) => question.correct
    );
    const answersOnlyToTwoBoolean = answersToQ1.map(
      (question) => question.correct
    );
    const answersOnlyToTHreeBoolean = answersToQ1.map(
      (question) => question.correct
    );

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
      answersOneBoolean: answersOnlyToOneBoolean,
      answersTwoBoolean: answersOnlyToTwoBoolean,
      answersThreeBoolean: answersOnlyToTHreeBoolean,
      answersTwo: answersOnlyToTwo,
      answersThree: answersOnlyToThree,
    };

    res.render("urls_questions", templateVars);
  } catch (error) {
    console.log(error);
  }
});

router.post("/result", async (req, res) => {
  const { userId } = req.session;

  const {
    option: result1,
    secondoption1: result2,
    thirdoption1: result3,
  } = req.body;

  const user = await getUsers();
  const currentUser = findUserById(userId, user);
  const dataQuiz = await getQuizById(currentUser[0].id);
  const result = await getResultByUserIdAndQuizId(
    currentUser[0].id,
    dataQuiz.id
  );

  const getResult = result[0].quiz_result;
  console.log(getResult);

  const score = [result1, result2, result3].filter(
    (result) => result === "true"
  ).length;
  console.log(score);

  const updatedScore = await updateScore(score, userId, dataQuiz.id);
  console.log(updatedScore);
  res.redirect("/users/quizzes");
});

module.exports = router;
