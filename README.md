
# Tetris:

This project is inspired by Tetris Effect (2018). This version of Tetris is entirely implemented in javascript, html, and css, primarily utilizing React/Redux.

- 1st goal is to build a basic version of tetris:
  - ~~basic graphics for grid/player~~
  - ~~tetromino bag logic (the bag generates a randomly sorted order for all 7 of the possible pieces)~~
  - ~~player controlled movement/rotation~~
  - ~~collision logic~~
  - ~~line clearing~~
  - point scoring (both points and record of line clearing)
  - ~~time display~~
  - ~~side menus (with time display, and point scoring)~~
  - ~~display next piece~~
  - ~~game over~~
  - ~~start game~~

- 2nd goal is more advanced game logic/UX improvements:
  - speed increase at intervals of line clears
  - quick drop (movement for dropping player piece immediately to bottom)
  - pause screen (with explanation of player controls)
  - local high score display
  - background music
  - hold piece
  - t-spins (being able to rotate a piece into a place it could only fit through rotation movement and not just through horizontal movement)
  - infinite spin (delay hitting bottom as long as you are rotating piece)
  - display highlight preview of where piece will land

- 3rd goal is Tetris Effect specific implementation:
  - syncronized sound effects with music
  - gradually changing music synced with line clears
  - speed synced with tempo of music
  - line clear sounds synced with music
  - graphics synced with line clears
  - graphics synced with music
  - better graphics
  - add zone element: Bar that fills up with line clears. Once triggered, slows down speed and allows you to build up a combo of line clears until time runs out.

The controls for the game are as follows:
- `a`/`left arrow key`: move left
- `d`/`right arrow key`: move right
- `s`/`down arrow key`: move piece down
- `q`: rotate counter-clockwise
- `e`: rotate clockwise

The following instructions were automatically generated by running create-react-app. The only thing you need to do in order to run the game is to install `yarn`(https://yarnpkg.com/en/docs/install) if you don't already have it, run the command `yarn` in the `src` directory, and then run `yarn start` and it should automatically run in localhost in your browser.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify




