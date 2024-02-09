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
const { getResultByUserIdAndQuizId } = require("../db/queries/results");
const { validUserCheck } = require('../db/queries/login');

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

router.post("/register", async (req, res) => {
  try {
    const userInfo = await userExists(req.body.email);
    if (userInfo) {
      res.redirect(302, `/error?message=${encodeURIComponent("Email already registered")}`);
      return;
    }

    // Store password in plaintext (not recommended)
    await addUser(req.body.name, req.body.password, req.body.email);

    const createdUser = await userExists(req.body.email);
    req.session.userId = createdUser.id;

    res.redirect(302, "/");

  } catch (err) {
    console.error("Error adding user: ", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

// End point to serve registration page
router.get("/register", async (req, res) => {
  try {
    const validUser = await validUserCheck(req.session.userId);
    if (validUser) {
      res.redirect(302, "/");
      return;
    }
    res.render("urls_register", { user: req.user });
  } catch (err) {
    console.error("Error: ", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

router.get("/quizzes", async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await getUsers();
    const currentUser = findUserById(userId, user);

    if (!currentUser || !currentUser.length) {
      return res.status(404).send("User not found");
    }

    const data = await getQuizById(currentUser[0].id);
    if (!data) {
      return res.status(404).send("Quiz not found");
    }

    const result = await getResultByUserIdAndQuizId(currentUser[0].id, data.id);
    const score = result[0] ? result[0].quiz_result : null;

    const templateVars = {
      user: currentUser[0],
      title: data.title,
      id: data.id,
      score: score
    };

    res.render("urls_my_quizzes", templateVars);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


//CREATE QUIZE PAGE
router.get("/create-quiz", async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await getUsers();
    const currentUser = findUserById(userId, user);

    if (!currentUser || !currentUser.length) {
      return res.status(404).send("User not found");
    }

    const templateVars = { user: currentUser[0] };
    res.render("urls_create_quiz", templateVars);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Serve login page
router.get("/login", async (req, res) => {
  try {
    const validUser = await validUserCheck(req.session.userId);
    if (validUser) {
      res.redirect(302, "/");
      return;
    }
    res.render("urls_login", { user: req.user });
  } catch (err) {
    console.error("Error: ", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

// Post login credentials and check if they are valid
router.post("/login", async (req, res) => {
  try {
    const userInfo = await userExists(req.body.email);
    if (!userInfo || req.body.password !== userInfo.password) {
      res.redirect(302, `/error?message=${encodeURIComponent("Invalid Login")}`);
      return;
    }

    req.session.userId = userInfo.id;
    res.redirect(302, "/");
  } catch (err) {
    console.error("Error: ", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

// GET route for displaying the signup form
router.get("/signup", (req, res) => {
  res.render("urls_login");
});

// POST route for handling user signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).send("Invalid credentials");
    }

    const existingUser = await userExists(email);

    if (existingUser) {
      return res.status(409).send("Email already exists");
    }

    const newUser = await addUser(name, password, email);
    console.log(newUser[0]);
    res.redirect("/users/login");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

