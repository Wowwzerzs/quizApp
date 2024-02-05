/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers } = require("../db/queries/users");

// router.get("/", (req, res) => {
//   //   const query = `SELECT * FROM widgets`;
//   //   console.log(query);
//   //   db.query(query)
//   //     .then((data) => {
//   //       const widgets = data.rows;
//   //       res.json({ widgets });
//   //     })
//   //     .catch((err) => {
//   //       res.status(500).json({ error: err.message });
//   //     });
// });

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

router.get("/login", (req, res) => {
  const { userId } = req.session;
  getUsers().then((user) => {
    const currentUser = findUserById(userId, user);

    const templateVars = { user: currentUser[0] };
    res.render("urls_login", templateVars);
  });

  // res.render("urls_login");
});

router.get("/signup", (req, res) => {
  res.render("urls_register");
});

module.exports = router;
