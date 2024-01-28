// Client facing scripts here
$(document).ready(function () {
  $(".login").on("click", () => {
    window.location.href = "/api/widgets/login";
  });

  $(".sign-up").on("click", () => {
    window.location.href = "/api/widgets/signup";
  });

  $(".create-quizzes").on("click", () => {
    window.location.href = "/users/create-quiz";
  });

  $(".my-quizzes").on("click", () => {
    window.location.href = "/users/quizzes";
  });

  $(".play-btn").on("click", () => {
    window.location.href = "/questions";
  });
});
