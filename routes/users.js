/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

router.get("/quizzes", (req, res) => {
  res.render("urls_my_quizzes");
});

router.get("/create-quiz", (req, res) => {
  res.render("urls_create_quiz");
});

module.exports = router;
