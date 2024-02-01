## QuizApp

### Routes to interact with the resources
* Routes created using nouns from user stories
* REST - Reprentational State Transfer - Naming convention
* B(GET) R(GET) E(POST) A(POST) D(POST)

* Main focus

- GET     /users             # Get all users
- GET     /users/:id         # Get a specific user by ID

- GET     /quizzes           # Get all quizzes
- GET     /quizzes/:id       # Get a specific quiz by ID
- 
- GET     /attempts/:id      # Get a specific attempt by ID
- GET     /results/:id       # Get the results of a specific attempt by ID
- 
- POST    /users/:id         # Edit a specific user by ID
- POST    /users             # Add a new user
- POST    /users/:id/delete  # Delete a specific user by ID
- POST    /list              # Add a new list
- POST    /lists/:id/delete  # Delete a specific list by ID
- POST    /quizzes           # Add a new quiz
- 
- POST    /quizzes/:id/delete  # Delete a specific quiz by ID
- POST    /attempts            # Add a new attempt

* Additional 

- GET     /visitors           # Get information about visitors
- GET     /lists              # Get all lists
- GET     /quizzes            # Get all quizzes
- GET     /home-page          # Get information about the home page
- GET     /users              # Get all users
- GET     /choices            # Get all choices
- GET     /challenges         # Get all challenges
- GET     /individuals        # Get all individuals
- GET     /links              # Get all links
- GET     /quizzes/:id        # Get a specific quiz by ID
- GET     /knowledge          # Get information about knowledge
- GET     /skills             # Get information about skills
- GET     /results            # Get all results
- GET     /performance        # Get information about performance
- GET     /mistakes           # Get information about mistakes
- GET     /options            # Get all options
- GET     /feedback           # Get information about feedback
- GET     /attempts           # Get all attempts
- GET     /others             # Get information about others
- GET     /non-registered-users   # Get information about non-registered users

- POST    /lists              # Add a new list
- POST    /quizzes            # Add a new quiz
- POST    /users              # Add a new user
- POST    /links              # Add a new link
- POST    /attempts           # Add a new attempt

- PUT     /users/:id          # Edit a specific user by ID
- PUT     /quizzes/:id        # Edit a specific quiz by ID

- DELETE  /users/:id          # Delete a specific user by ID
- DELETE  /quizzes/:id        # Delete a specific quiz by ID