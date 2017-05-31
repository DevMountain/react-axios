<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we are going to create a customer management tool for a computer repair shop. We'll keep track of basic customer information, such as name/email/phone, current repair statuses, and also a log for notes. This tool will use `axios` to hit an API and will also use `redux-promise-middleware` to asynchronously handle data from the API. Majority of the project has been built out already for you. The parts we'll need to finish include: the store, two reducers, two service files, and hooking up the service files into the components that use them. 

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/1.png" />

## Setup

* `fork` and `clone` this repository.
* `cd` into the project directory.
* Run `npm i`.
* Run `npm start`.
  * The app in its current state should intentionally not compile correctly.
* In a new terminal:
  * `cd` into the project directory.
  * Run `npm run api`.
    * We will teach you about creating APIs later on in the course.

You should now have two processes running in two separate terminals. If you want to commit changes as you develop, use a third terminal.

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/1g.gif" />

## Step 1

### Summary

In this step we will create our `store`. Since this tool will be hitting an API we'll need to `npm install redux-promise-middleware` to handle async actions. 

### Instructions

* `npm install --save redux-promise-middleware`.
* Open `src/store.js`.
* Import `createStore`, `applyMiddleware`, and `combineReducers` from `redux`.
  * We'll be using two reducers in this project. One for the customer list and one for customer editting.
  * Follow along in the detailed instructions if you are unfamiliar with `combineReducers`.
* Import `promiseMiddleware` from `redux-promise-middleware`.
* Import `listReducer` from `src/ducks/listReducer.js`.
* Import `workspaceReducer` from `src/ducks/workspaceReducer.js`.
* Export `createStore` by default:
  * Use `combineReducers` to hook up both reducers.
  * Use `undefined` for the initial state. ( Our reducers handle this )
  * Use `applyMiddleware` with `promiseMiddleWare` invoked.

### Detailed Instructions

If we take a look at our development server we'll see that our app is currently not compiling correctly. This is because some components are trying to connect to a store that doesn't exist. Let's create this store. Open `src/store.js`. We'll need three things from `redux`: `createStore`, `applyMiddleware`, and `combineReducers`. `createStore` will allows us to export the creation of our store. `applyMiddleware` will allow us to use middleware on actions that go to our reducers. `combineReducers` will allow us to use two different reducers to separate concerns of data.

### Solution

<details>

<summary> <code> src/store.js </code> </summary>

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import listReducer from './ducks/listReducer';
import workspaceReducer from './ducks/workspaceReducer';

export default createStore( combineReducers( { listReducer, workspaceReducer } ), undefined, applyMiddleware( promiseMiddleware() ) );
```

</details>