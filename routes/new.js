/*
 * All routes for Create A New Quiz are defined here
 * Since this file is loaded in server.js into /new,
 *   these routes are mounted onto /new
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { createNewQuiz } = require("../db/queries/newquiz.js");
const { getUserById } = require("../db/queries/users.js");

router.get('/', async (req, res) => {

  //Provides access to the page only when user is logged in.
  if (!req.session.userId) {
    return res.status(403).send(`Status code: ${res.statusCode} - ${res.statusMessage}. Please log in or register to get started.`);
  }

  try {
    const user = await getUserById(req.session.userId);
    const templateVars = {
      user
    };
    res.render("../views/urls_create_quiz", templateVars);

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

router.post("/", async (req, res) => {

  // Assigning variables to the req.body content acquired from form submission.
  const submission = req.body;
  const userId = req.session.userId;

  const title = submission.quizTitle;

  //Question 1
  const quest1 = submission.quest1;
  const q1a1 = submission.q1a1;
  const q1a2 = submission.q1a2;
  const q1a3 = submission.q1a3;
  const answers1 = [q1a1, q1a2, q1a3,];
  let correctAnswer1 = submission.correctAnswer1;

  //Matching the correct answer with the options.
  if (correctAnswer1 === "option1") {
    correctAnswer1 = q1a1;
  } else if (correctAnswer1 === "option2") {
    correctAnswer1 = q1a2;
  } else if (correctAnswer1 === "option3") {
    correctAnswer1 = q1a3;
  }


  //Question 2
  const quest2 = submission.quest2;
  const q2a1 = submission.q2a1;
  const q2a2 = submission.q2a2;
  const q2a3 = submission.q2a3;
  const answers2 = [q2a1, q2a2, q2a3];
  let correctAnswer2 = submission.correctAnswer2;


  //Matching the correct answer with the options.
  if (correctAnswer2 === "option1") {
    correctAnswer2 = q2a1;
  } else if (correctAnswer2 === "option2") {
    correctAnswer2 = q2a2;
  } else if (correctAnswer2 === "option3") {
    correctAnswer2 = q2a3;
  }



  // Question 3
  const quest3 = submission.quest3;
  const q3a1 = submission.q3a1;
  const q3a2 = submission.q3a2;
  const q3a3 = submission.q3a3;
  const answers3 = [q3a1, q3a2, q3a3];
  let correctAnswer3 = submission.correctAnswer3;


  //Matching the correct answer with the options.
  if (correctAnswer3 === "option1") {
    correctAnswer3 = q3a1;
  } else if (correctAnswer3 === "option2") {
    correctAnswer3 = q3a2;
  } else if (correctAnswer3 === "option3") {
    correctAnswer3 = q3a3;
  }

  //Set up of quiz object to be fed into query function.
  const generatorObj = {
    title: submission.quizTitle,
    questions: {
      q1: {
        question: quest1,
        answers: answers1,
        correctAnswer: correctAnswer1
      },
      q2: {
        question: quest2,
        answers: answers2,
        correctAnswer: correctAnswer2
      },
      q3: {
        question: quest3,
        answers: answers3,
        correctAnswer: correctAnswer3
      }
    }
  };

  //Setting the privacy setting (t/f) for quiz.
  let privacy = submission.privacySetting;
  privacy = (privacy === "public") ? "TRUE" : "FALSE";

  await createNewQuiz(userId, title, generatorObj, privacy);

  res.redirect("/");
});

module.exports = router;