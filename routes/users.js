// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into /users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

// const express = require("express");
// const router = express.Router();
// const { getUsers, userExists, addUser } = require("../db/queries/users");
// const { getQuizById } = require("../db/queries/quiz");
// const { getResultByUserIdAndQuizId } = require("../db/queries/results");

// const findUserById = (id, arr) => {
//   return arr.filter((user) => user.id === id);
// };

// // //HOME
// // router.get("/quizzes", (req, res) => {
// //   const { userId } = req.session;

// //   getUsers()
// //     .then((user) => {
// //       const currentUser = findUserById(userId, user);
// //       // console.log(currentUser[0]);

// //       // getQuizById(userId).then((data) => {
// //       //   data;

// //       // });
// //       //get quiz title, score and number of attempts

// //       // const templateVars = { user: currentUser[0] };
// //       // res.render("urls_my_quizzes", templateVars);
// //       return currentUser[0];
// //     })
// //     .then((user) => {
// //       getQuizById(user.id).then((data) => {
// //         // console.log(data.title);
// //         console.log(data);

// //         const templateVars = {
// //           user: user ? user : null,
// //           title: data.title,
// //           id: data.id,
// //         };
// //         res.render("urls_my_quizzes", templateVars);
// //         // return data.title;
// //       });
// //     })
// //     .catch((error) => {
// //       console.log(error);
// //     });
// // });

// router.get("/quizzes", async (req, res) => {
//   try {
//     const { userId } = req.session;

//     const user = await getUsers();

//     const currentUser = findUserById(userId, user);
//     const data = await getQuizById(currentUser[0].id);
//     const result = await getResultByUserIdAndQuizId(currentUser[0].id, data.id);
//     const score = result[0].quiz_result;
//     // console.log(score);
//     // console.log(currentUser[0].name);
//     const templateVars = {
//       user: currentUser[0],
//       title: data.title,
//       id: data.id,
//       score,
//     };
//     res.render("urls_my_quizzes", templateVars);
//   } catch (error) {
//     console.log(error);
//   }

//   // getUsers(),
//   // getQuizById(user.id)
//   //   .then((user) => {

//   //     // console.log(currentUser[0]);

//   //     // getQuizById(userId).then((data) => {
//   //     //   data;

//   //     // });
//   //     //get quiz title, score and number of attempts

//   //     // const templateVars = { user: currentUser[0] };
//   //     // res.render("urls_my_quizzes", templateVars);
//   //     // return currentUser[0];
//   //   })
//   //   .then((user) => {
//   //     getQuizById(user.id).then((data) => {
//   //       // console.log(data.title);
//   //       console.log(data);

//   //       const templateVars = {
//   //         user: user ? user : null,
//   //         title: data.title,
//   //         id: data.id,
//   //       };
//   //       res.render("urls_my_quizzes", templateVars);
//   //       // return data.title;
//   //     });
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// });

// //CREATE QUIZE PAGE
// router.get("/create-quiz", (req, res) => {
//   const { userId } = req.session;

//   console.log(req.body);
//   getUsers().then((user) => {
//     const currentUser = findUserById(userId, user);
//     console.log(currentUser);
//     const templateVars = { user: currentUser[0] };
//     res.render("urls_create_quiz", templateVars);
//   });
// });

// //LOGIN
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   console.log(req.session.userId);

//   if (!email || !password) {
//     res.send("invalid password");
//   }

//   userExists(email).then((user) => {
//     if (!user) {
//       res.send("invalid email");
//     }
//     if (password !== user.password) {
//       res.send("invalid password");
//     }
//     req.session.userId = user.id;

//     res.redirect("/users/quizzes");
//   });
// });

// router.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;

//   if (!email || !password || !name) {
//     res.send("invalid credentials");
//   }

//   userExists(email).then((user) => {
//     if (!user) {
//       addUser(name, password, email).then((data) => {
//         console.log(data[0]);
//         res.redirect("/api/widgets/login");
//         // return data[0];
//       });
//     }

//     if (user.email === email) {
//       res.send("email already exist");
//     }

//     return user;
//   });
// });

// module.exports = router;

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { getUsers, userExists, addUser } = require("../db/queries/users");
const { getQuizById } = require("../db/queries/quiz");
const { getResultByUserIdAndQuizId } = require("../db/queries/results");

const findUserById = (id, arr) => {
  return arr.filter((user) => user.id === id);
};

// //HOME
// router.get("/quizzes", (req, res) => {
//   const { userId } = req.session;

//   getUsers()
//     .then((user) => {
//       const currentUser = findUserById(userId, user);
//       // console.log(currentUser[0]);

//       // getQuizById(userId).then((data) => {
//       //   data;

//       // });
//       //get quiz title, score and number of attempts

//       // const templateVars = { user: currentUser[0] };
//       // res.render("urls_my_quizzes", templateVars);
//       return currentUser[0];
//     })
//     .then((user) => {
//       getQuizById(user.id).then((data) => {
//         // console.log(data.title);
//         console.log(data);

//         const templateVars = {
//           user: user ? user : null,
//           title: data.title,
//           id: data.id,
//         };
//         res.render("urls_my_quizzes", templateVars);
//         // return data.title;
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

router.get("/quizzes", async (req, res) => {
  try {
    const { userId } = req.session;

    const user = await getUsers();

    const currentUser = findUserById(userId, user);
    const data = await getQuizById(currentUser[0].id);
    const result = await getResultByUserIdAndQuizId(currentUser[0].id, data.id);
    const score = result[0].quiz_result;
    // console.log(score);
    // console.log(currentUser[0].name);
    const templateVars = {
      user: currentUser[0],
      title: data.title,
      id: data.id,
      score,
    };
    res.render("urls_my_quizzes", templateVars);
  } catch (error) {
    console.log(error);
  }

  // getUsers(),
  // getQuizById(user.id)
  //   .then((user) => {

  //     // console.log(currentUser[0]);

  //     // getQuizById(userId).then((data) => {
  //     //   data;

  //     // });
  //     //get quiz title, score and number of attempts

  //     // const templateVars = { user: currentUser[0] };
  //     // res.render("urls_my_quizzes", templateVars);
  //     // return currentUser[0];
  //   })
  //   .then((user) => {
  //     getQuizById(user.id).then((data) => {
  //       // console.log(data.title);
  //       console.log(data);

  //       const templateVars = {
  //         user: user ? user : null,
  //         title: data.title,
  //         id: data.id,
  //       };
  //       res.render("urls_my_quizzes", templateVars);
  //       // return data.title;
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

//CREATE QUIZE PAGE
router.get("/create-quiz", (req, res) => {
  const { userId } = req.session;

  console.log(req.body);
  getUsers().then((user) => {
    const currentUser = findUserById(userId, user);
    console.log(currentUser);
    const templateVars = { user: currentUser[0] };
    res.render("urls_create_quiz", templateVars);
  });
});

//LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.session.userId);

  if (!email || !password) {
    res.send("invalid password");
  }

  userExists(email).then((user) => {
    if (!user) {
      res.send("invalid email");
    }
    if (password !== user.password) {
      res.send("invalid password");
    }
    req.session.userId = user.id;

    res.redirect("/users/quizzes");
  });
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.send("invalid credentials");
  }

  userExists(email).then((user) => {
    if (!user) {
      addUser(name, password, email).then((data) => {
        console.log(data[0]);
        res.redirect("/api/widgets/login");
        // return data[0];
      });
    }

    if (user.email === email) {
      res.send("email already exist");
    }

    return user;
  });
});

module.exports = router;

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require("express");
// const { addUser, userExists } = require("../db/queries/users");
// const { validUserCheck } = require("../db/queries/login");
// const router = express.Router();

// // Post endpoint to add a new user to the database without password hashing
// router.post("/register", async (req, res) => {
//   try {
//     const userInfo = await userExists(req.body.email);
//     if (userInfo) {
//       res.redirect(
//         302,
//         `/error?message=${encodeURIComponent("Email already registered")}`
//       );
//       return;
//     }

//     // Store password in plaintext (not recommended)
//     await addUser(req.body.name, req.body.password, req.body.email);

//     const createdUser = await userExists(req.body.email);
//     req.session.userId = createdUser.id;

//     res.redirect(302, "/");
//   } catch (err) {
//     console.error("Error adding user: ", err);
//     res.redirect(
//       302,
//       `/error?message=${encodeURIComponent("Internal Server Error")}`
//     );
//   }
// });

// // End point to serve registration page
// router.get("/register", async (req, res) => {
//   try {
//     const validUser = await validUserCheck(req.session.userId);
//     if (validUser) {
//       res.redirect(302, "/");
//       return;
//     }
//     res.render("urls_register", { user: req.user });
//   } catch (err) {
//     console.error("Error: ", err);
//     res.redirect(
//       302,
//       `/error?message=${encodeURIComponent("Internal Server Error")}`
//     );
//   }
// });

// // Serve login page
// router.get("/login", async (req, res) => {
//   try {
//     const validUser = await validUserCheck(req.session.userId);
//     if (validUser) {
//       res.redirect(302, "/");
//       return;
//     }
//     res.render("login", { user: req.user });
//   } catch (err) {
//     console.error("Error: ", err);
//     res.redirect(
//       302,
//       `/error?message=${encodeURIComponent("Internal Server Error")}`
//     );
//   }
// });

// // Post login credentials and check if they are valid
// router.post("/login", async (req, res) => {
//   try {
//     const userInfo = await userExists(req.body.email);
//     if (!userInfo || req.body.password !== userInfo.password) {
//       res.redirect(
//         302,
//         `/error?message=${encodeURIComponent("Invalid Login")}`
//       );
//       return;
//     }

//     req.session.userId = userInfo.id;
//     res.redirect(302, "/");
//   } catch (err) {
//     console.error("Error: ", err);
//     res.redirect(
//       302,
//       `/error?message=${encodeURIComponent("Internal Server Error")}`
//     );
//   }
// });

// router.post("/create-quiz", (req, res) => {
//   console.log(req.body);
//   res.send("ok");
// });

module.exports = router;
