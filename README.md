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

Before we actually dive into the code for the component we'll need to create our actions, action creators, and cases in our reducer in our `src/ducks/listReducer.js` file. We'll also need to setup a service file, which we'll do in the next step.

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

## Step 4

### Summary

In this step, we will create a service file that will handle all the API calls for our `List` component. This service file will also dispatch actions to our store.

We'll be using a package called `axios` to make API calls. 

### Instructions

* Open `src/services/listService.js`.
* Run `npm install --save axios`.
* Import `axios` from `axios`.
* Import the `getList` action creator from `src/ducks/listReducer.js`.
* Import the `store` from `src/store.js`.
* Import `apiURL` from `src/api.js`.
* Export a function called `dispatchGetList`:
  * This function shouldn't use any parameters.
  * This function should create a promise using `axios`: 
    * The `axios` call should be a `GET`.
    * The url should be `apiURL`.
    * The callback should return the `data` property of the `response`.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that our reducer is setup we will create a service file that will use its action creator and dispatch an event to the store. This service file will also create the promise that our action creator is looking for. Let's open `src/services/listService.js`. To create our promises we'll be using a package called `axios`. If you haven't already run `npm install --save axios`. We can then import it into our service file.

```js
import axios from 'axios';
```

We'll also need our action creator from our list reducer and our store.

```js
import axios from 'axios';
import { getList } from '../ducks/listReducer';
import store from '../store';
```

The last import we'll need is the API url for our axios calls. I've created an `api.js` file in `src/`. This is a good method to follow as it allows you to fix the API url for the service files that use it. This beats having to update the URL one by one in each function in each service file.

```js
import axios from 'axios';
import { getList } from '../ducks/listReducer';
import store from '../store';
import apiURL from '../api';
```

Now that we have all our imports let's create a function that will dispatch our `getList` action creator to our store. Inside this function we'll use `axios` to create a promise. When using axios, you chain on a method of the API method you want. This can either be `GET`, `PUT`, `DELETE`, `POST`, `PATCH`, and a couple others. You then invoke this method and pass in the URL as the first parameter. The second parameter can be an object that will equal the request's body. Here are a couple examples:

```js
axios.get( 'http://localhost:3000/somePath' );
axios.post( 'http://localhost:3000/somePath', { str: 'This is the request body' } );
```

This will return a promise which you can then chain a `.then()` that accepts a callback function as the first parameter. The most common first parameter you'll see in the callback function is `response`. This is the response from the API. Here are some examples:

```js
axios.get( 'http://localhost:3000/somePath' ).then( response => response.data );
axios.post( 'http://localhost:3000/somePath', { str: 'This is the request body' } ).then( response => response.data );
```

We'll want to make an axios call that uses the `get` method. In the callback we'll want to return the `data` property from the response. Remember that axios returns a promise. Let's capture the promise in a variable called promise.

```js
import axios from 'axios';
import { getList } from '../ducks/listReducer';
import store from '../store';
import apiURL from '../api';

export function dispatchGetList() {
  const promise = axios.get( apiURL ).then( response => response.data );
}
```

Now that we have our promise we can dispatch our `getList` action creator with the promise as an argument. We can do this by using the `dispatch` method on `store`.

```js
import axios from 'axios';
import { getList } from '../ducks/listReducer';
import store from '../store';
import apiURL from '../api';

export function dispatchGetList() {
  const promise = axios.get( apiURL ).then( response => response.data );
  store.dispatch( getList(promise) );
}
```

</details>

### Solution

<details>

<summary> <code> src/services/listService.js </code> </summary>

```js
import axios from 'axios';
import { getList } from '../ducks/listReducer';
import store from '../store';
import apiURL from '../api';

export function dispatchGetList() {
  const promise = axios.get( apiURL ).then( response => response.data );
  store.dispatch( getList(promise) );
}
```

</details>

## Step 5

### Summary

In this step, we'll go into our `List` component and have it fetch the customer list from the API.

### Instructions

* Open `src/components/List/List.js`.
* Import the `dispatchGetList` function from `src/services/listService.js`.
* Create a `componentDidMount` life-cycle method:
  * This method should call the `dispatchGetList` function.

### Solution

<details>

<summary> <code> src/components/List/List.js </code> </summary>

```jsx
import React, { Component } from 'react';
import { connect } from "react-redux";
import './List.css';

import { dispatchGetList } from '../../services/listService';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

class List extends Component {
  componentDidMount() {
    dispatchGetList();
  }

  render() {
    const {
      loading,
      customerList,
    } = this.props;
    
    const CustomerComponents = customerList.map( customer => (
      <Customer
        key={ customer.id } 
        id={ customer.id }
        first={ customer.first }
        last={ customer.last }
      />
    ));

    return (
      <div id="List__container">
        {
          loading
          ?
            <p> Fetching Customers.. </p>
          :
            <div id="List__namesContainer">
              { CustomerComponents }
              <CreateCustomer />
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps( state ) {
  state = state.listReducer;
  return state;
}

export default connect( mapStateToProps )( List );
```

</details>

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3.png" />

## Step 6 

### Summary

In this step, we'll update the workspace reducer to handle showing the `CreateCustomer` component and handle creating a customer.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
* Create two action types:
  * `SHOW_CREATE_CUSTOMER` that equals `"SHOW_CREATE_CUSTOMER"`.
    * This action will update the `Workspace` component to display the `CreateCustomer` component.
  * `CREATE_CUSTOMER` that equals `"CREATE_CUSTOMER"`.
    * This action will add a customer to our database in our API.
* Create two action creators:
  * `showCreateCustomer` - This should return an object:
    * This object should have a type property that equals `SHOW_CREATE_CUSTOMER`.
    * This object should have a payload property that equals `null`.
  * `createCustomer` - This should have a `promise` parameter and return an object:
    * This object should have a type property tha equals `CREATE_CUSTOMER`.
    * This object should have a payload property that equals `promise`.
* Create two cases in the reducer:
  * `SHOW_CREATE_CUSTOMER`:
    * This case should return a new object with all the previous state values.
    * The new object should update the value of `creating` to true.
  * `CREATE_CUSTOMER + '_FULFILLED'`:
    * This case should return a new object:
      * `loading` should equal `false`.
      * `initialLoad` should equal `true`.
      * `customer` should equal `{}`.
      * `creating` should equal `false`.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that our customer list is populating correctly let's get our `New Customer` button functional. Open `src/ducks/workspaceReducer.js`. This reducer keeps track of what component to display in the `Workspace` component. In order to show the `CreateCustomer` component, we'll have to set the `creating` property on state to true. We'll also update our reducer to handle creating a customer as well. When a customer is created we set `initialLoad` to `true` to display the initial workspace view.

Let's begin by creating the action types. We'll need one called `SHOW_CREATE_CUSTOMER` and one called `CREATE_CUSTOMER`.

```js
// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";
```

Now let's create an action creator for each type. The action creator should return an object with a type property and also a payload property. The type should equal the action type. The payload for `SHOW_CREATE_CUSTOMER` should be `null` and the payload for `CREATE_CUSTOMER` should be `promise`.

```js
// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

We'll then need to update our reducer to handle the cases for these actions. We'll make a case for `SHOW_CREATE_CUSTOMER` and a case for `CREATE_CUSTOMER + '_FULFILLED'`. `SHOW_CREATE_CUSTOMER` should return a new object with all the previous values on state. The new object should also update the value of `creating` to `true`. This will effectively show the `CreateCustomer` component.  `CREATE_CUSTOMER` should return a new object where `loading` is `false`, `initialLoad` is `true`, `customer` is `{}`, and `creating` is `false`.

```js
// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  let newState;
  switch( action.type ) {
    case SHOW_CREATE_CUSTOMER:
      return Object.assign({}, state, { creating: true });

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        initialLoad: true,
        creating: false,
        customer: {}
      }

    // Get Customer - Pending

    // Get Customer - Fulfilled

    // Get Customer - Rejected

    // Update Status - Fulfilled

    // Update Log - Fulfilled

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    default: return state;
  }
}

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

</details>

### Solution

<details>

<summary> <code> src/ducks/workspaceReducer.js </code> </summary>

```js
const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  let newState;
  switch( action.type ) {
    case SHOW_CREATE_CUSTOMER:
      return Object.assign({}, state, { creating: true });

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        initialLoad: true,
        creating: false,
        customer: {}
      }

    // Get Customer - Pending

    // Get Customer - Fulfilled

    // Get Customer - Rejected

    // Update Status - Fulfilled

    // Update Log - Fulfilled

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    default: return state;
  }
}

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

</details>

## Step 7 

### Summary

In this step, we'll update the workspace service file to handle showing the `CreateCustomer` component and handle creating a customer.

### Instructions

* Open `src/services/workspaceService.js`.
* Import `axios` from `axios`.
* Import `store` from `src/store.js`.
* Import `apiURL` from `src/api.js`.
* Import `showCreateCustomer` and `createCustomer` from `src/ducks/workspaceReducer.js`.
* Import `dispatchGetList` from `src/services/listService.js`.
* Export a function called `dispatchShowCreateCustomer`:
  * This function should dispatch `showCreateCustomer` invoked.
* Export a function called `dispatchCreateCustomer` that takes an object as a parameter: 
  * This function should create a promise using `axios.post`.
  * The axios URL should be `apiURL`.
  * The axios request body should equal the object passed in as an argument.
  * The axios callback should invoke `dispatchGetList`.


### Solution

<details>

<summary> <code> src/services/workspaceService.js </code> </summary>

```js
import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer } from '../ducks/workspaceReducer';

export function dispatchShowCreateCustomer() {
  store.dispatch( showCreateCustomer() );
}

export function dispatchCreateCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => {
    dispatchGetList();
  });

  store.dispatch( createCustomer(promise) );
}
```

</details>

## Step 8

### Summary

In this step, we'll configure our `List` component to show the form to create a new customer. We'll also update the `CreateCustomer` component to successfully create a customer.

### Instructions

* Open `src/components/List/CreateCustomer/CreateCustomer.js`.
  * Import `dispatchShowCreateCustomer` from `src/services/workspaceService.js`.
  * Add an `onClick` prop on the `button` element that calls `dispatchShowCreateCustomer`.
* Open `src/components/Workspace/CreateCustomer/CreateCustomer.js`.
  * Import `dispatchCreateCustomer` from `src/services/workspaceService.js`.
  * In the `create` method invoke `dispatchCreateCustomer` with `customer` as the first parameter.

### Solution

<details>

<summary> <code> src/components/List/CreateCustomer/CreateCustomer.js </code> </summary>

```jsx
import React from 'react';
import './CreateCustomer.css';

import { dispatchShowCreateCustomer } from '../../../services/workspaceService';

export default function CreateCustomer() {
  return (
    <div id="CreateCustomerBtn__container">
      <button id="CreateCustomer__btn" onClick={ dispatchShowCreateCustomer }> New Customer </button>
    </div>
  )
}
```

</details>

<details>

<summary> <code> src/components/Workspace/CreateCustomer/CreateCustomer.js ( not entire file ) </code> </summary>

```jsx
import { dispatchCreateCustomer } from '../../../services/workspaceService';

create() {
  const { first, last, email, phone } = this.state;
  var customer = {
    first,
    last,
    email,
    phone,
    status: 'New Customer',
    log: ''
  }

  dispatchCreateCustomer( customer );
}
```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/2g.gif" />

## Step 9

### Summary

In this step, we'll update the the customer list to become a navigation list that will update the workspace on the right.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
  * Create a `GET_CUSTOMER` action type.
  * Create a `getCustomer` action creator.
    * This action creator should have a `promise` parameter.
    * This action creator should return an object with a type equal to `GET_CUSTOMER` and a payload equal to `promise`.
  * Create a `GET_CUSTOMER + _'PENDING'` case:
    * This case should return a new object with the following state:
      * `loading` should equal `true`.
      * `initalLoad` should equal `false`.
      * `creating` should equal `false`.
      * `customer` should equal `{}`.
  * Create a `GET_CUSTOMER + _'FULFILLED'` case:
    * This case should return a new object with all the previous values from state.
    * The new object should set `loading` to `false`.
    * The new object should set `customer` to `action.payload`.
* Open `src/services/workspaceService.js`.
  * Import `getCustomer` from `src/ducks/workspaceReducer.js`.
  * Export a function called `dispatchGetCustomer`:
    * This function should have an `id` parameter.
    * This function should create a promise using `axios.get`.
    * The axios URL should be `apiURL` + the value of `id`.
    * The axios callback should return the `data` property of the response.
* Open `src/components/List/Customer/Customer.js`.
  * Import `dispatchGetCustomer` from `src/services/workspaceService.js`.
  * Add an `onClick` prop to the `span` element that calls `dispatchGetCustomer` and passes in `id` as an argument.

<details>

<summary> Detailed Instructions </summary>

<br />



</details>

### Solution

<details>

<summary> <code> src/ducks/workspaceReducer.js </code> </summary>

```js
const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";
const GET_CUSTOMER = "GET_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  let newState;
  switch( action.type ) {
    case SHOW_CREATE_CUSTOMER:
      return Object.assign({}, state, { creating: true });

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        initialLoad: true,
        creating: false,
        customer: {}
      }

    case GET_CUSTOMER + "_PENDING":
      return {
        loading: true,
        initialLoad: false,
        creating: false,
        customer: {}
      }

    case GET_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { loading: false, customer: action.payload });

    // Update Status - Fulfilled

    // Update Log - Fulfilled

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    default: return state;
  }
}

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}

export function getCustomer( promise ) {
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}
```

</details>

<details>

<summary> <code> src/services/workspaceService.js </code> </summary>

```js
import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer, getCustomer } from '../ducks/workspaceReducer';
import { dispatchGetList } from '../services/listService';

export function dispatchShowCreateCustomer() {
  store.dispatch( showCreateCustomer() );
}

export function dispatchCreateCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => {
    dispatchGetList();
  });

  store.dispatch( createCustomer(promise) );
}

export function dispatchGetCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  store.dispatch( getCustomer(promise) );
}
```

</details>

<details>

<summary> <code> src/components/List/Customer/Customer.js </code> </summary>

```jsx
import React from 'react';
import './Customer.css';

import { dispatchGetCustomer } from '../../../services/workspaceService';

export default function Customer( { id, first, last } ) {
  return (
    <div className="Customer__listName">
      <span onClick={ () => dispatchGetCustomer( id ) }>{ first } { last }</span>
    </div>
  )
}
```

</details>