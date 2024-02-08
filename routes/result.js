const express = require('express');
const router = express.Router();
const { getQuestionsCorrectAnswers, getUserProvidedAnswers } = require('../db/queries/results');
const { getUserById } = require('../db/queries/userinfo.js');

// Route to fetch quiz results by quizResultId
router.get('/:quizResultId', async (req, res) => {
  try {
    // Fetch user information for _header.ejs conditionals
    const user = await getUserById(req.session.userId);

    // Get the correct answers for the quiz
    const quizData = await getQuestionsCorrectAnswers(req.params.quizResultId);

    // Prepare template variables
    const templateVars = {
      user,
      quizzes: quizData,
      quizResult: quizData[0].quiz_result,
      quizTitle: quizData[0].title,
      req
    };

    // Fetch answers provided by user
    const providedAnswersData = await getUserProvidedAnswers(req.params.quizResultId);

    // Check if providedAnswersData is null and set templateVars.answers accordingly
    templateVars.answers = providedAnswersData ? providedAnswersData[0].answers : [];

    res.render('result', templateVars);
  } catch (err) {
    console.error('Error loading quiz result: ', err);
    res.redirect(302, `/error?message=${encodeURIComponent('Result not found')}`);
  }
});

module.exports = router;
