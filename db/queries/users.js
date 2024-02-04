const db = require("../connection");

// To get all users from the database
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// To add a new user to the database
const addUser = function (userName, plainPassword, email) {
  return db
    .query(
      `INSERT INTO users (name, password, email)
    VALUES ($1, $2, $3)`,
      [userName, plainPassword, email]
    )
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.error(error);
    });
};

// To check if a user with a given email already exists in the database
const userExists = function (email) {
  return db
    .query(
      `SELECT * FROM users
    WHERE email = $1;
    `,
      [email]
    )
    .then((data) => {
      // console.log(data);
      return data.rows[0];
    })
    .catch((error) => {
      console.error(error);
    });
};

// To get user info by id
const getUserById = function (userId) {
  return new Promise((resolve, reject) => {
    const queryStr = `
    SELECT *
    FROM users
    WHERE id = $1;`;

    const queryParams = [userId];

    db.query(queryStr, queryParams)
      .then((data) => {
        resolve(data.rows[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { getUsers, addUser, userExists, getUserById };
