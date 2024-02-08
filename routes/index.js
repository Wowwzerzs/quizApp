const express = require("express");
const router = express.Router();
const { getPublicQuizzes } = require("../db/queries/index");
const { validUserCheck } = require("../db/queries/login");
const { getUserById } = require("../db/queries/users");

// Display all public quizzes
router.get("/", async (req, res) => {
  try {
    // Check if the user is valid
    const validUser = await validUserCheck(req.session.userId);
    if (!validUser) {
      return res.redirect("/users/login");
    }

    // Get user information
    const user = await getUserById(req.session.userId);

    // Fetch all public quizzes
    const publicQuizzes = await getPublicQuizzes();

    // Render the 'index' view with public quizzes and user information
    res.render("index", { quizzes: publicQuizzes, user });

  } catch (err) {
    console.error("Error: ", err);
    res.status(500).redirect("/error?message=" + encodeURIComponent("Internal Server Error"));
  }
});

module.exports = router;
