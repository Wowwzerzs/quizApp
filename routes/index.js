const express = require("express");
const router = express.Router();
const { getPublicQuizzes } = require("../db/queries/index");
const { validUserCheck } = require("../db/queries/login");
const { getUserById } = require("../db/queries/userinfo.js");

// Display all public quizzes
router.get("/", async (req, res) => {
  try {
    const validUser = await validUserCheck(req.session.userId);
    if (!validUser) {
      res.redirect("/users/login");
      return;
    }

    // Get user information
    const user = await getUserById(req.session.userId);

    // Fetch all public quizzes
    const publicQuzzies = await getPublicQuizzes();

    // Render the 'index' view with public quizzes and user information
    const templateVars = { quizzes: publicQuzzies, user };
    res.render("../views/index", templateVars);

  } catch (err) {
    console.error("Error: ", err);
    res.redirect(302, `/error?message=${encodeURIComponent("Internal Server Error")}`);
  }
});

module.exports = router;
