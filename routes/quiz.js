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

module.exports = router;