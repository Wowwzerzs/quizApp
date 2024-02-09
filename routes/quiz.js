// <<<<<<< newroute
// const express = require("express");
// const router = express.Router();
// const { getUsers } = require("../db/queries/users");
// const {
//   getQuizQuestionByID,
//   getAnswersByQuestionId,
//   getQuizById,
// } = require("../db/queries/quiz");

// const {
//   getResultByUserIdAndQuizId,
//   updateScore,
// } = require("../db/queries/results");
// const { route } = require("./users");

// const findUserById = (id, arr) => {
//   return arr.filter((user) => user.id === id);
// };

// router.get("/:id", (req, res) => {
//   const { userId } = req.session;
//   const { id: quizId } = req.params;
// =======
// const express = require("express");
// const router = express.Router();
// const { getUsers } = require("../db/queries/users");
// const {
//   getQuizQuestionByID,
//   getAnswersByQuestionId,
//   getQuizById,
// } = require("../db/queries/quiz");

// const {
//   getResultByUserIdAndQuizId,
//   updateScore,
// } = require("../db/queries/results");

// const findUserById = (id, arr) => {
//   return arr.filter((user) => user.id === id);
// };

// // router.get("/:id", (req, res) => {
// //   const { userId } = req.session;
// //   const { id: quizId } = req.params;

// //   getUsers().then((user) => {
// //     const currentUser = findUserById(userId, user);
// //     getQuizQuestionByID(quizId).then((data) => {
// //       console.log(data);

// //       const questionsOnly = data.map((quiz) => {
// //         return quiz.question;
// //       });

// //       console.log(questionsOnly);

// //       const templateVars = { user: currentUser[0], questions: questionsOnly };
// //       res.render("urls_questions", templateVars);
// //     });
// //   });
// // });

// router.get("/:id", async (req, res) => {
//   try {
//     const { userId } = req.session;
//     const { id: quizId } = req.params;

//     const [user, questionsObj] = await Promise.all([
//       getUsers(),
//       getQuizQuestionByID(quizId),
//       // getAnswersByQuestionId(),
//     ]);

//     const [questionsIdOne, questionsIdTwo, questionsIdThree] = questionsObj.map(
//       (user) => user.id
//     );

//     const answersToQ1 = await getAnswersByQuestionId(questionsIdOne);
//     const answersToQ2 = await getAnswersByQuestionId(questionsIdTwo);
//     const answersToQ3 = await getAnswersByQuestionId(questionsIdThree);
//     // console.log(answersToQ1);
//     const answersOnlyToOne = answersToQ1.map((question) => question.answer);
//     const answersOnlyToTwo = answersToQ2.map((question) => question.answer);
//     const answersOnlyToThree = answersToQ3.map((question) => question.answer);

//     const answersOnlyToOneBoolean = answersToQ1.map(
//       (question) => question.correct
//     );
//     const answersOnlyToTwoBoolean = answersToQ1.map(
//       (question) => question.correct
//     );
//     const answersOnlyToTHreeBoolean = answersToQ1.map(
//       (question) => question.correct
//     );
// >>>>>>> master

//     const currentUser = findUserById(userId, user);

//     const questionsOnly = questionsObj.map((quiz) => {
//       return quiz.question;
//     });

//     // console.log(questionsObj);
//     // const answersOnly = answers.map((answers) => {

//     //   return answers.answer;
//     // });
//     // console.log(answersOnly);

//     // console.log(answers);
//     const templateVars = {
//       user: currentUser[0],
//       questions: questionsOnly,
//       answersOne: answersOnlyToOne,
//       answersOneBoolean: answersOnlyToOneBoolean,
//       answersTwoBoolean: answersOnlyToTwoBoolean,
//       answersThreeBoolean: answersOnlyToTHreeBoolean,
//       answersTwo: answersOnlyToTwo,
//       answersThree: answersOnlyToThree,
//     };

//     res.render("urls_questions", templateVars);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.post("/result", async (req, res) => {
//   const { userId } = req.session;

//   const {
//     option: result1,
//     secondoption1: result2,
//     thirdoption1: result3,
//   } = req.body;

//   const user = await getUsers();
//   const currentUser = findUserById(userId, user);
//   const dataQuiz = await getQuizById(currentUser[0].id);
//   const result = await getResultByUserIdAndQuizId(
//     currentUser[0].id,
//     dataQuiz.id
//   );

//   const getResult = result[0].quiz_result;
//   console.log(getResult);

//   const score = [result1, result2, result3].filter(
//     (result) => result === "true"
//   ).length;
//   console.log(score);

//   const updatedScore = await updateScore(score, userId, dataQuiz.id);
//   console.log(updatedScore);
//   res.redirect("/users/quizzes");
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const { createQuizArray, insertQuizAttempt, loadCorrectAnswers, findAnswerId, insertUserAnswer, addQuizResult, quizExistCheck } = require("../db/queries/quiz");
const { validUserCheck } = require("../db/queries/login");
const { getUserById } = require("../db/queries/users.js");

// Display quiz to be attempted based on params
router.get("/:quiz_id", async (req, res) => {
  try {
    // Check if user is logged in with valid user id
    const validUser = await validUserCheck(req.session.userId);
    if (!validUser) {
      res.redirect("/users/login");
      return;
    }

    // Check if a quiz exists with the param id
    const quizExists = await quizExistCheck(req.params.quiz_id);
    if (!quizExists) {
      res.redirect(302, `/error?message=${encodeURIComponent("Quiz does not exist")}`);
      return;
    }

    // Create an array of questions and answers for the quiz
    const quizData = await createQuizArray(req.params.quiz_id);

    // Create object with user information for _header.ejs conditionals.
    const user = await getUserById(req.session.userId);

    const templateVars = {
      questions: quizData,
      quizTitle: quizData[0].title,
      quizId: req.params.quiz_id,
      user
    };

    res.render("../views/quiz", templateVars);
  } catch (err) {
    console.error("Error:", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});


// End point to handle quiz submission
router.post("/:quiz_id", async (req, res) => {
  try {
    // Check if user is logged in with valid user id
    const validUser = await validUserCheck(req.session.userId);
    if (!validUser) {
      res.status(401).send("Must be logged in to submit a quiz");
      return;
    }

    const quizId = req.params.quiz_id;
    const userId = req.session.userId;

    let score = 0;
    let answerId = null;
    let quizResultId = 0;

    // Insert initial quiz attempt
    const quizAttemptData = await insertQuizAttempt(quizId, userId, score);
    quizResultId = quizAttemptData[0].id;

    // Load correct answers for quiz
    const correctAnswersData = await loadCorrectAnswers(quizId);
    const submittedAnswers = req.body.a;

    for (let i = 0; i < correctAnswersData.length; i++) {
      // Find submitted answers id
      const answerData = await findAnswerId(submittedAnswers[`${i}`]);
      if (answerData[0] === undefined) {
        answerId = null;
      } else {
        answerId = answerData[0].id;
      }

      await insertUserAnswer(quizResultId, answerId);

      if (correctAnswersData[i].answer === submittedAnswers[`${i}`]) {
        score++;
      }
    }

    // Revise quiz attempt with score
    await addQuizResult(quizResultId, userId, quizId, score);
    res.redirect(302, `/result/${quizResultId}`);
  } catch (err) {
    console.error("Error:", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

module.exports = router;