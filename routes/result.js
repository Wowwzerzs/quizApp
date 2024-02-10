const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");
const {
  getResultByUserIdAndQuizId,
  updateScore,
} = require("../db/queries/results");
const {
  getQuizById,
} = require("../db/queries/quiz");

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

router.post("/", async (req, res) => {
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