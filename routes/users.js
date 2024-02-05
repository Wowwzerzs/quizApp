/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers, userExists, addUser } = require("../db/queries/users");

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

//HOME
router.get("/quizzes", (req, res) => {
  const { userId } = req.session;

  getUsers().then((user) => {
    const currentUser = findUserById(userId, user);

    const templateVars = { user: currentUser[0] };
    res.render("urls_my_quizzes", templateVars);
  });
});

//CREATE QUIZE
router.get("/create-quiz", (req, res) => {
  res.render("urls_create_quiz");
});

//LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.session.userId);

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
    req.session.userId = user.id;

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
