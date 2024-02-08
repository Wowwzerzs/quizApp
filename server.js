// Load .env data into process.env
require("dotenv").config();

// Import necessary modules
const express = require("express");
const morgan = require("morgan");
const sassMiddleware = require("./lib/sass-middleware");
const cookieSession = require("cookie-session");
const { getPublicQuizzes } = require("./db/queries/index.js");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
// app.use(express.json());
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

// Middleware
// Morgan for logging HTTP requests to STDOUT
app.use(morgan("dev"));
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Compile Sass to CSS and serve it statically
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
// Serve static files from the 'public' directory
app.use(express.static("public"));
// Enable cookie session
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "keys2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own~
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const usersRoutes = require("./routes/users");
const quizRoutes = require("./routes/quiz");
const resultRoutes = require("./routes/result");
const errorRoutes = require("./routes/error");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/users", usersRoutes);
app.use("/result", resultRoutes);
app.use("/", homeRoutes, errorRoutes, logoutRoutes);
app.use("/quiz", quizRoutes);
app.use("/new", newQuizRoutes);
app.use("/quizhistory", quizHistoryRoutes);
app.use("/leaderboards", leaderboardsRoutes);
app.use("/account", accountRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("urls_my_quizzes");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
