const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {
  createQuizArray,
  insertQuizAttempt,
  loadCorrectAnswers,
  findAnswerId,
  insertUserAnswer,
  addQuizResult,
  quizExistCheck,
} = require("../db/queries/quiz");
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
      res.redirect(
        302,
        `/error?message=${encodeURIComponent("Quiz does not exist")}`
      );
      return;
    }

    // Create an array of questions and answers for the quiz
    const quizData = await createQuizArray(req.params.quiz_id);
=======
const { getUsers } = require("../db/queries/users");
const {
  getQuizQuestionByID,
  getAnswersByQuestionId,
} = require("../db/queries/quiz");

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};
>>>>>>> 4d1a20efe64d22a3c1282e78d9bc3516caceafe6

router.get("/:id", async (req, res) => {
  try {
    const { userId } = req.session;
    const { id: quizId } = req.params;

    const [user, questionsObj] = await Promise.all([
      getUsers(),
      getQuizQuestionByID(quizId),
    ]);

    const [questionsIdOne, questionsIdTwo, questionsIdThree] = questionsObj.map(
      (user) => user.id
    );

    const answersToQ1 = await getAnswersByQuestionId(questionsIdOne);
    const answersToQ2 = await getAnswersByQuestionId(questionsIdTwo);
    const answersToQ3 = await getAnswersByQuestionId(questionsIdThree);
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

    const templateVars = {
<<<<<<< HEAD
      questions: quizData,
      quizTitle: quizData[0].title,
      quizId: req.params.quiz_id,
      user,
    };

    res.render("urls_questions", templateVars);
  } catch (err) {
    console.error("Error:", err);
    res.redirect(
      302,
      `/error?message=${encodeURIComponent("Internal Server Error")}`
    );
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
    res.redirect(
      302,
      `/error?message=${encodeURIComponent("Internal Server Error")}`
    );
=======
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
>>>>>>> 4d1a20efe64d22a3c1282e78d9bc3516caceafe6
  }
});

module.exports = router;
