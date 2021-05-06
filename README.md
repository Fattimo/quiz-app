# Quiz Thing 🏫

[Play with the live site here!!!](https://quiz-thin.herokuapp.com/)

## What it does

The Quiz Thing makes and takes multiple choice quizzes, mainly. You can also like quizzes and save them for later as well as take quizzes and have your highest attempt scored. All quizzes made are publicly accessible and editable.

This is a project loosely inspired by the Udemy web app coding challenge, which I've forked from. I implemented stuff that they explicitly say not to implement, which is why it's loosely based.

## Tech stack

This project makes use of the PERN stack ([PostgreSQL](https://www.postgresql.org/docs/13/index.html), [ExpressJS](https://expressjs.com/), [ReactJS](https://reactjs.org/docs/getting-started.html), [NodeJS](https://nodejs.org/en/)), and is a Heroku deployed Express server which doubles as the API router for PSQL requests and the server for frontend files. This project was bootstrapped using create-react-app.

As for the pages themselves, the main components used were the [React Router](https://reactrouter.com/) for page management and [React-ContentEditable](https://github.com/lovasoa/react-contenteditable) for form inputs. Speaking of forms, no state management library like Redux was used, but I do have a couple of containers from [unstated-next](https://github.com/jamiebuilds/unstated-next) that manage local storage manipulation (for liked quizzes and high scores). As for CSS (or the lack thereof), I used [Tailwind](https://tailwindcss.com), which supplies utility class styles for use across all elements. I think it looks pretty cool for minimal effort, which is why I use it, but a more technical motivation for using it is that it can also reduce bundle size when deploying. ⛲

In terms of the future of this project, I am likely going to port over all of the existing work into a NextJS and Apollo/GraphQL shell and continue from there.

## Project structure

```
client/src -> the part of the application served to the user.
🀄 components -> contains React components & the actual content of the site
📑 pages -> contains the pages that the router can route to
📦 containers -> contains containers used for state management of states used by numerous different (sibling) components
👨‍ services/http -> the file containing requests to the corresponding API endpoints
server/ -> global data pulled in from the Contentful CMS
📊 bin/www -> the file used to actually start up the server
📶 main -> where the main content of the server lives
   || db.js -> connects us to the PSQL databse
   || routes.js -> contains all of the API endpoints and their associated queries
   || schemas.sql -> non-functional file, but includes the tables of the database
app.js -> the express server, put here because it's easier to reference the build files from the root directory.
```

## Running Locally

Make sure you have [yarn](https://yarnpkg.com/getting-started/install) installed first. Then, run this terminal command inside the root directory **AND** the `client` directory:

```sh
yarn install
cd client
yarn install
```

Then, run this terminal command, again, inside the root directory **AND** the `client` directory. 

```sh
yarn start
```


(new terminal/in parallel)
```sh
cd client
yarn install
```

The root directory will start up the server on `localhost:5000` while the client directory will start up the frontend on `localhost:3000`. `client` has hot reloading enabled, but the server does not.

## Build for production

```sh
cd client
yarn build
```

This will create the build folder for the React frontend. Once the build folder has been created, feel free to start up the express server and go straight to `localhost:5000` -- you should be able to see the frontend being served by the Express server! 🙌

## Known Bugs/Unimplemented Features

* Deleting a quiz after liking the quiz will still allow it to show up in the likes quizzes
* No Search functionality
* Attempting to access a not-existing quiz (i.e. /quizzes/abc) will lead you to a broken screen, as there is no 400 response handling implemented just yet.
* Jest test suite

## For Recruiters

a.k.a my thoughts on the current iteration of the product

As I got working on this project, I started to feel like the tech stack I chose was very cumbersome. Prior to this project, I made a very similar card-scrolling app using NextJS and MongoDB, and comparing the two projects, I think NextJS/SSR is simply just better than create-react-app and CSR, and I personally much prefer the flexibility of noSQL databases for smaller projects like these compared to a possibly more stable but inflexible SQL databse. (This is why for Phase 2 of this app, I'm switching to NextJS and GraphQL. I haven't used GraphQL before, but reading through the docs, it seems much less painful than SQL.)

Honestly, the only reason I chose the stack that I did was that I wanted to force myself to use a relational database and _not_ NextJS for a project.

Ultimately, though, this tech choice led to some compromises and complications in the actual codebase. For the most part, I would say my code is pretty good -- on the front end, I leverage the component system well, the directories are ordered well, and my code is overall very React-esque.

However, the one exception to that is the components that control the individual quiz view. As I used an SQL database, I had to make 3 different tables in sequential one-to-many relationships: a quiz has many questions which has many answers. In Mongo, I could just stick the answers all on a single question document and even stick all of the questions to a single quiz document, but as a result of having these different tables, managing state and data was pretty tough. I feel like there is some React pattern out there that I haven't seen before that would have helped draw the line between component and data manipulation more, but in the end there are a few busy-looking files with data scattered all over the place

In terms of the backend, one plus I will give to SQL is that the queries are easy to write and not cluttered at all -- the hard part is just architecting what the database will look like. So, there's not much to critique here, but there was an opportunity to use currying more in the `routes.js` file to reduce the repetitive nature of writing API endpoints. 

## The Future

Again, I want to migrate this codebase to NextJS/Apollo/GraphQL. The next feature that I would implement as a part of making that jump is the addition of user authentication and attaching everything that is currently locally stored to a user profile. This means that users would be able to make quizzes under their name, potentially comment on quizzes, and save records of quiz attempts for future reference.
