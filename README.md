# Tasktracker

## Link:
 * https://tasks3.yuqingc.com/

## Features & Design choices of App
 * Users register and log in by name, user's name has to be unique. Password will be stored in hased form in database.
 * Any logged in user can create task and it to other users. A task can only be assigned to one user. User can track time spent on a task in step of 15 min.
 * Any logged in user can mark a task as complete, once marked, this task will be deleted from database.
 * Any logged in user can edit the information of a task, including title, description, assignee and time spent.
 * Once logged in, user will be assigned a token for future visit, this token will also be stored in the browser's cookie, thus it's safe for a logged in user to leave the website and re-enter without having to login again.
 

