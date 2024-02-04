/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers, userExists, addUser } = require("../db/queries/users");

router.get("/quizzes", (req, res) => {
  res.render("urls_my_quizzes");
});

router.get("/create-quiz", (req, res) => {
  res.render("urls_create_quiz");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.send("invalid password");
  }

  userExists(email).then((user) => {
    if (!user) {
      res.send("invalid email");
    }
    if (password !== user.password) {
      res.send("invalid password");
    }
    res.redirect("/users/quizzes");
  });
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.send("invalid credentials");
  }
  addUser(name, password, email).then((data) => {
    console.log(data[0]);
    res.redirect("/api/widgets/login");
  });
});

module.exports = router;
