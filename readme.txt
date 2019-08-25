-A few notes about the project-

In this project, as you said I've used .Net framework for backend and Reactjs for frontend and Redux for state management.
All are works.

-Minor mistakes/differences-

a- In the reactjs client, after finish a task, checkbox won't disappear which you just checked. if you refresh the page,
it will be alright. I've tried to solve this but tasklist checkboxes need to implement dynamically as an array in redux part.
With the map function(javascript) it causes a problem.

b- After starting the server, it says "Server Error in '/' Application." as an initial route, but server works.

c- Task list ordering by task id which is randomly generated, inserting to the db with this random id, 
so after adding a task or finish a task, will order by random id

d- I've used "react-responsive-modal" npm package rather than your modal part. Because using close on click outside of 
modal action will require jQuery functions to handle DOMs unlike React is using virtual DOM and render with data changes. 
React with jQuery is not safe. So, I used that package and it has clicking outside of modal action.

-Instructions-

1- After entering TaskApi folder, open TaskApi.sln with visual studio, and start it by clicking IISExpress button on top
2- When starting the server first time, it may give NuGet package is not installed error, then delete the bin folder just created,
it will install the packages automatically
3- For react-side, enter client folder, execute npm i && npm start with cmd/console
4- Database is already set and at App_Data folder and no need to change the connection string
5- Use the app with http://localhost:3000/d-m-yyyy