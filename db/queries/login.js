const db = require('../connection');

// Check if a user is valid and exists in the database
const validUserCheck = function (userId) {
  return db.query(`
  SELECT EXISTS (
  SELECT id
  FROM users
  WHERE id = $1);`, [userId])
    .then(data => {
      return data.rows[0].exists;
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = { validUserCheck };