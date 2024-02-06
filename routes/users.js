/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers, userExists, addUser } = require("../db/queries/users");
const { getQuizById } = require("../db/queries/quiz");

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

//HOME
router.get("/quizzes", (req, res) => {
  const { userId } = req.session;

  getUsers()
    .then((user) => {
      const currentUser = findUserById(userId, user);
      // console.log(currentUser[0]);

      // getQuizById(userId).then((data) => {
      //   data;

      // });
      //get quiz title, score and number of attempts

      // const templateVars = { user: currentUser[0] };
      // res.render("urls_my_quizzes", templateVars);
      return currentUser[0];
    })
    .then((user) => {
      getQuizById(user.id).then((data) => {
        // console.log(data.title);
        const templateVars = { user, title: data.title };
        res.render("urls_my_quizzes", templateVars);
        // return data.title;
      });
      console.log(title);
    });
});

//CREATE QUIZE PAGE
router.get("/create-quiz", (req, res) => {
  const { userId } = req.session;

  console.log(req.body);
  getUsers().then((user) => {
    const currentUser = findUserById(userId, user);
    console.log(currentUser);
    const templateVars = { user: currentUser[0] };
    res.render("urls_create_quiz", templateVars);
  });
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

  userExists(email).then((user) => {
    if (!user) {
      addUser(name, password, email).then((data) => {
        console.log(data[0]);
        res.redirect("/api/widgets/login");
        // return data[0];
      });
    }

    if (user.email === email) {
      res.send("email already exist");
    }

    return user;
  });
});

module.exports = router;
