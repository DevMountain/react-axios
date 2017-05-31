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
    * The API has been setup to be delayed by 1 second. 

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

<details>

<summary> Detailed Instructions </summary>

<br />

If we take a look at our development server we'll see that our app is currently not compiling correctly. This is because some components are trying to connect to a store that doesn't exist. Let's create this store. Open `src/store.js`. We'll need three things from `redux`: `createStore`, `applyMiddleware`, and `combineReducers`. `createStore` will allows us to export the creation of our store. `applyMiddleware` will allow us to use middleware on actions that go to our reducers. `combineReducers` will allow us to use two different reducers to separate concerns of data.

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
```

We'll also need `redux-promise-middleware` to use in combination with `applyMiddleware`. We're using `redux-promise-middleware` to handle async API calls. Let's import this underneath our `redux` imports.

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
```

In order to create our store, we'll also need our reducers. So let's import those as well. Our reducers are located in `src/ducks`.

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import listReducer from './ducks/listReducer';
import workspaceReducer from './ducks/workspaceReducer';
```

Now that we have all our imports, let's export by default the creation of our store. This will be done a little differently than how it was done in the mini project. We'll be using `combineReducers` to use two reducers. In order to use `combineReducers` you have to invoke it and pass in an object of reducers. For example: `combineReducers( { listReducer, workspaceReducer } )`. We'll also be using `undefined` for the intial state parameter since our reducers are handling initial statate on their own. And then for the last parameter of `createStore` we will be using `applyMiddleware` in combination with `promiseMiddleware`. It will look like the following code:

```js
import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import listReducer from './ducks/listReducer';
import workspaceReducer from './ducks/workspaceReducer';

export default createStore( combineReducers( { listReducer, workspaceReducer } ), undefined, applyMiddleware( promiseMiddleware() ) );
```


</details>

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

## Step 2

### Summary

In this step, we will take our store created from the previous step and hook it up in `src/index.js`. This will allow our App to compile correctly.

### Instructions

* Open `src/index.js`.
* Import `Provider` from `react-redux`.
* Import `store` from `src/store.js`.
* Wrap the `App` component in a `Provider` component:
  * The `Provider` component should have a `store` prop that equals `store`. 

<details>

<summary> Detailed Instructions </summary>

<br />

Now that our store is created we can hook it up to our App in `src/index.js`. This will allow our App to have access to the store and the reducers and will also allow our App to compile correctly. Let's open `src/index.js`. We'll need to import `Provider` from `react-redux` and `store` from `src/store.js`. 

```js
import { Provider } from "react-redux";
import store from './store';
```

The `Provider` component will "provide" the store to our App. All we need to do is wrap the `App` component in a `Provider` component and give the `Proivder` component a `store` prop that equals `store`. 

```js
import { Provider } from "react-redux";
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

</details>

### Solution

<details>

<summary> <code> src/index.js </code> </summary>

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from "react-redux";
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
```

</details>

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/2.png" />

## Step 3

### Summary

Now that our App can compile correctly, let's focus on getting data from the API. We'll begin with the `List` component. This component is responsible for retrieving the list of customers and also acting as a navigation component to update the `Workspace` component on the right with the selected customer's information.

Before we actually dive into the code for the component we'll need to create our actions, action creators, and cases in our reducer in our `src/ducks/listReducer.js` file.

### Instructions

* Open `src/ducks/listReducer.js`.
* Get familiar with the current structure of the reducer.
* Create an action type called `GET_LIST` that equals `"GET_LIST"`.
* Create an action creator called `getList` that equals a function:
  * This function have one parameter called `promise`.
  * This function should return an object:
    * This object should have a key called `type` that equals `GET_LIST`.
    * This object should have a key called `payload` that equals `promise`.
* Locate the switch statement in the reducer:
  * Create a case for `GET_LIST + '_PENDING'`:
    * This case should return a new object:
      * This object should set `loading` to true.
      * This object should set `customerList` to an empty array.
  * Create a case for `GET_LIST + '_FULFILLED'`:
    * This case should return a new object:
      * This object shouldset `loading` to `false`.
      * This object should set `customerList` to the payload property on `action`.
  
<details>

<summary> Detailed Instructions </summary>

<br />

Before we can update the `List` component to fetch data from the API we'll need to setup our list reducer. Let's open `src/ducks/listReducer.js`. Since we are using `redux-promise-middleware` our actions that are promises have a string attached to them. It can either be `_FULFILLED`, `_PENDING`, or `_REJECTED`. Since this API cannot fail we'll just worry about creating cases for `_PENDING` and `_FULFILLED`. 

This reducer will be responsible for fetching customer information and updating the list of customers. Let's create an action type called `GET_LIST` that equals `"GET_LIST"`.

```js
const GET_LIST = "GET_LIST";
```

Then we can create an action creator that uses `GET_LIST` as its type. This action creator will accept a promise. For now just create a parameter called `promise` and we'll create the promise in a later step.

```js
const GET_LIST = "GET_LIST";

export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}
```

Now that we have our action type and action creator let's update our reducer to handle the case of `GET_LIST`. We'll need one case for its `_PENDING` state and one for its `_FULFILLED` state. If our case is `_PENDING` we'll want to set `loading` to `true` and reset the value of `customerList` to an empty array. This will allow our App to display a message to the user that the customer information is being fetched. If our case is `_FULFILLED` we'll want to set `loading` to `false` and set the value of `customerList` to the payload property on `action`. Our app will then display a list of customer names that can update the `Workspace` component on the right.

```js
const GET_LIST = "GET_LIST";

export default function listReducer( state = initialState, action ) {
  switch( action.type ) {
    case GET_LIST + "_PENDING": 
      return {
        loading: true,
        customerList: []
      }

    case GET_LIST + "_FULFILLED":
      return {
        loading: false,
        customerList: action.payload
      }

    default: return state;
  }
}

export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}
```

</details>

### Solution

<details>

<summary> <code> src/ducks/listReducer.js </code> </summary>

```js
const initialState = {
  loading: false,
  customerList: []
}

// Action Types
const GET_LIST = "GET_LIST";

// Reducer
export default function listReducer( state = initialState, action ) {
  switch( action.type ) {
    case GET_LIST + "_PENDING": 
      return {
        loading: true,
        customerList: []
      }

    case GET_LIST + "_FULFILLED":
      return {
        loading: false,
        customerList: action.payload
      }

    default: return state;
  }
}

// Action Creators
export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}
```

</details>