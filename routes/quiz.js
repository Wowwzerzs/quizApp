const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("urls_questions");
});

module.exports = router;
