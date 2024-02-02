/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/login/:id', (req, res) => {
  // set the cookie
  req.cookies.user_id = req.params.user_id;

  // send to homepage
  res.redirect('/home');

})

module.exports = router;
