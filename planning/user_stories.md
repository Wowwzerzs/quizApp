## QuizApp

### User Stories 
* Describe how a user will interact with our application
* As a _____, I can ______, because _______.

* As a visitor, I can see a list of public quizzes on the home page, because I want to discover interesting quizzes without having to search for them.

* As a registered user,  I can create 3-question quizzes that have multiple choices of 3 answers, with 1/3 being the correct one, because I like making small quizzes and engaging others with quick challenges.

* As a registered user, I can make my quizzes unlisted, because I want to keep them private and only accessible to specific individuals.

* As a registered user, I can share a link to a single quiz, because I want to invite others to take my quiz without making it public.

* As a registered user, I can see a list of public quizzes, because I want to explore quizzes created by other users.

* As a registered user, I can attempt a quiz, because I want to test my knowledge and skills.

* As a registered user, I can see the results of my recent attempt, because I want to review my performance and learn from my mistakes AND my selected options turn red or green depending on if they are right or wrong, providing immediate feedback on my performance and helping me learn.

* As a registered user, I can share a link to the result of my attempt, because I want to share my quiz results with others and compare my performance.

* As a non-registered user, I cannot create and edit quizzes, because they dont belong to me.

### Pick out the nouns from User Stories 
* nouns === resources 
* nouns are tables 

- Visitor (1)
- List (1)
- Quizzes (5)
- Home page (1)
- User (4)
- Choices (1)
- Challenges (1)
- Individuals (1)
- Link (2)
- Quiz (4)
- Knowledge (1)
- Skills (1)
- Results (2)
- Performance (2)
- Mistakes (1)
- Options (1)
- Feedback (1)
- Attempt (2)
- Others (1)
- Non-registered user (1)

* build out the ERD using the nouns 

### MVP 
* Minimum Viable Product (MVP) 
* What is the minimum feature set that a user will find useful

- main page, see different quizzes 
- quiz page, can create and attempt quizzes
-  


* Minimum Viable Demo (MVD)
* What feature can we effectively show off in a 5 minute demo
* If we're not going to show it, dont build it 

### Wireframe
* design the front end
* anyone on the team can implement the design 
* Using tiny app and tweeter front end and backend as a reference

### User Registration and Login 
* dont do it, instead do this:
* Use code in server file 

```js
// localhost:3000/login/7
app.get('/login/:user_id', (req, res) => {
  // set the cookie
  req.cookies.user_id = req.params.user_id; // For encrypted cookies

  // or

  //cookie-parser
  res.cookie('user_id', req.params.user_id); // For plain text cookies

  // send the user somewhere
  res.redirect('/home');

})
```

### Tech choices
* back end - node, express, postgres
* Front end - HTML, CSS, JS, JQuery      

### SPA vs Multi-page app
* not mutually exclusive
* can use both types for the QuizApp

### Git
* do not code on master/main

### splitting up the work
* vertical - every member is working on a diff piece of the stack
* horizontal - every member working on the same layer
* pair programming 

### Comunication
* This is so important 