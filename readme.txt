-A few notes about the project-

In this project, as you said I've used .net framework for backend and reactjs for frontend and redux for state management
All are works.

-Minor mistakes-

a- In the reactjs client, after finish a task, checkbox won't disappear which you just checked. if you refresh the page,
it will be alright. I've tried to solve this but tasklist checkboxes need to implement dynamaticly as an array in redux part.
With the map function(javascript) it causes a problem.

b- After starting the server, it says "Server Error in '/' Application." as an initial route, but server works.

c- Task list ordering by task id which is randomly generated, so after added a task or finish a task, will order by random id

-Instructions-

1- After entering TaskApi folder, open TaskApi.sln with visual studio, and start by clicking IISExpress button on top
3- For react-side, enter client folder, execute npm i && npm start with cmd/console
3- Database is already set and at App_Data folder