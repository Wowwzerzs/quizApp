const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");
const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

router.get("/", (req, res) => {
  const { userId } = req.session;

  getUsers().then((user) => {
    const currentUser = findUserById(userId, user);

    const templateVars = { user: currentUser[0] };
    res.render("urls_questions", templateVars);
  });
});

module.exports = router;
