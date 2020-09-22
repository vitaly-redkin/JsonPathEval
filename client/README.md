
This project is JSON Path Evaluator Test Assignment for 11sigma.

It is a React Application created with [Create React App](https://github.com/facebook/create-react-app) so all usual scripts should work:

-  `yarn install` to install all dependencies
-  `yarn start` to run the project in the development mode
-  `yarn build` to build the project in the production mode

  

##  Dependencies

  - The project is built using React 16.3 and uses Typescript as a language. 
  - Redux (with the redux-thunk middleware) is used as a state manager. 
  - [Reactstrap](https://reactstrap.github.io/) is used as a CSS framework (it is a wrapper around Bootsrap 4).
  - [JSONPath Plus](https://github.com/JSONPath-Plus/JSONPath) is used as a JSONPath library. This is a quite recent "extension" of the classic JSONPath library with some query syntax improvements.
  - [react-json-tree](https://github.com/reduxjs/redux-devtools/tree/master/packages/react-json-tree) is used as a JSON visualization component. It works quite good and has an excellent "pedigree" (it is used by Redux DevTools browser extension). I do not see much of a reason to reinvent the wheel here.
  - Assorted auxiliary libraries (lodash, React Helmet, etc.) I use in my day-to-day projects and suitable here.

## Implementation Notes

### User Interface
UI is built with a "simplicity means beauty" principle. It is definitely not an "eye candy" but looks good enough and is responsive (tested in Chrome and Safari on Mac and in the phone/tablet emulators starting with iPhone 6).

### Redux as Store
The whole Redux store setup is probably an overkill for such small project (as well as any other state manager). But I used the same "framework" I use in my production projects where an extra verbosity where writing is by far  justified by the type safety when using.

### Performace with Large Files
I tried quite hard to find some "perfect" solution to make the UI performance not dependent on the JSON file size - and ultimately failed. 
The optimal way is to evaluate only JSON nodes which are shown right now (i.e. a very small subset, always limited by the screen size). While I can "collect" the list of shown nodes from the JSON visualization component I use I have to make some string assumptions on the JSON format and the path expression used (like the whole JSON to be an array on the top level) - otherwise I have to always evaluate "root" node, putting the whole optimization "down the drain".
Another possible way is to run the JSON search "on the background". The only feasible solution (on the client) is to use the web workers. But it is quite hard to use the third-party libraries in the web worker - you basically have to eject from CRA, find and attach a separate JS lib which does the job, etc. It is possible - but require a lot of work and research. In the real life such operations are usually done on the backend anyway and are "asynchronous" (for the client) by nature.
I used a sample JSON with 1200 objects to be a default "test case". The search time on my (quite fast) laptop is about 0.5 seconds. This is bad but not awful.
I liberally used setTimeout() in my code to emulate "asynchrounness" and to keep user updated on the application status. I do not do this in the real life (when the frontend is just a "gateway" for the backend).
 
 ## Running App
 I have deployed the production build of the application to [Heroku](https://json-path-eval.herokuapp.com/). Please keep in mind it is a free tier, so the server is sleeping until you wake it up.
