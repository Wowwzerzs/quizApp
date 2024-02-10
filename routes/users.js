/*
 * This file defines routes related to user management, such as registration, login, and quizzes.
 * These routes are mounted onto '/users' in server.js.
 * For more information on routing in Express, see: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers, userExists, addUser } = require("../db/queries/users");
const { getQuizById } = require("../db/queries/quiz");
const { getResultByUserIdAndQuizId } = require("../db/queries/results");
const { validUserCheck } = require('../db/queries/login');

// Function to find a user by ID in an array
const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

// Route for user registration
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

// Route to serve registration page
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

// Route to display user's quizzes
router.get("/quizzes", async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await getUsers();
    const currentUser = await findUserById(userId, user);

    if (!currentUser || !currentUser.length) {
      return res.status(404).send("User not found");
    }

    const data = await getQuizById(currentUser[0].id);
    console.log(data);
    console.log(currentUser[0].id);
    if (!data) {
      return res.status(404).send("Quiz not found");
    }

    const result = await getResultByUserIdAndQuizId(currentUser[0].id, data.id);

    // Check if result is defined and has at least one element
    const score = result && result.length > 0 ? result[0].quiz_result : null;

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

// Route to create a quiz page
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

// POST route to handle quiz creation submission
router.post("/create-quiz", async (req, res) => {
  try {
    // Extract quiz data from request body
    const { title, question1, question2, question3, answers1, answers2, answers3, correctAnswers } = req.body;

    // Your logic to process the quiz data and save it to the database
    // Example:
    const quizData = {
      title: title,
      questions: [
        { question: question1, answers: answers1, correctAnswer: correctAnswers[0] },
        { question: question2, answers: answers2, correctAnswer: correctAnswers[1] },
        { question: question3, answers: answers3, correctAnswer: correctAnswers[2] }
      ]
    };

    // Save the quiz data to the database using your query function
    await createNewQuiz(quizData);

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to serve login page
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

// Route to handle login credentials
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

// Route to display the signup form
router.get("/signup", (req, res) => {
  res.render("urls_login");
});

// Route to handle user signup
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
