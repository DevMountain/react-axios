<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we are going to create a customer management tool for a computer repair shop. We'll keep track of basic customer information, such as name/email/phone, current repair statuses, and also a log for notes. This tool will use `axios` to hit an API and asynchronously receive the data. The majority of the project has been built out already for you. The parts we'll need to finish include: the store, two reducers, two service files, and hooking up the service files into the components that use them.

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
    * <b>The API has been setup to be delayed by 1 second.</b>

You should now have two processes running in two separate terminals. If you want to commit changes as you develop, use a third terminal.

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/1g.gif" />

## Step 1

### Summary

We'll begin with the `List` component. This component is responsible for retrieving the list of customers and also acting as a navigation component to update the `Workspace` component on the right with the selected customer's information.

### Instructions


<details>

<summary> Detailed Instructions </summary>

<br />

Before we can update the `List` component to fetch data from the API, we'll need to setup our list reducer. Let's open `src/ducks/listReducer.js`. Since we are using `redux-promise-middleware` our actions that are promises have a string attached to them. It can either be `_FULFILLED`, `_PENDING`, or `_REJECTED`. Since this API cannot fail, we'll just worry about creating cases for `_PENDING` and `_FULFILLED`.

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

Now that our reducer is setup, we will create a service file that will use its action creator and dispatch an event to the store. This service file will also create the promise that our action creator is looking for. Let's open `src/services/listService.js`. To create our promises we'll be using a package called `axios`. If you haven't already run `npm install --save axios`. We can then import it into our service file.

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

Now that we have all our imports, let's create a function that will dispatch our `getList` action creator to our store. Inside this function we'll use `axios` to create a promise. When using axios, you chain on a method of the API method you want. This can either be `GET`, `PUT`, `DELETE`, `POST`, `PATCH`, and a couple others. You then invoke this method and pass in the URL as the first parameter. The second parameter can be an object that will equal the request's body. Here are a couple examples:

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

Now that our customer list is populating correctly, let's get our `New Customer` button functional. Open `src/ducks/workspaceReducer.js`. This reducer keeps track of what component to display in the `Workspace` component. In order to show the `CreateCustomer` component, we'll have to set the `creating` property on state to true. We'll also update our reducer to handle creating a customer as well. When a customer is created we set `initialLoad` to `true` to display the initial workspace view.

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

In this step, we'll update the customer list to become a navigation list that will update the workspace on the right. This step will be larger than usual. The goal of this step will be to take you through the entire process of creating an action in one step.

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

Let's begin by opening `src/ducks/workspaceReducer.js`. We are going to need an action type called `GET_CUSTOMER`. We will use the action when a user clicks on a name in the `List` component. Let's also create an action creator called `getCustomer` that has a `promise` parameter. This funciton should return an object with a `type` property that equals `GET_CUSTOMER` and a `payload` property that equals `promise`.

```js
const GET_CUSTOMER = "GET_CUSTOMER";

export function getCustomer( promise ) {
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}
```

Now let's update our reducer to handle the action of `GET_CUSTOMER`. We'll need a case for `GET_CUSTOMER + '_PENDING'` and `GET_CUSTOMER + '_FULFILLED'`. When a customer is pending we'll update the Workspace component to display that to the user. When a customer is fulfilled we'll update the Workspace component to show the editor for a customer.

```js
const GET_CUSTOMER = "GET_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
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

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    default: return state;
  }
}

export function getCustomer( promise ) {
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}
```

Now that our reducer is setup to handle getting a customer, let's open `src/services/workspaceService.js` and import our new action creator.

```js
import { showCreateCustomer, createCustomer, getCustomer } from '../ducks/workspaceReducer';
```

Now let's create a function that we'll use in our component. Let's call it `dispatchGetCustomer`. This function should have an `id` parameter. This function should create a promise by using `axios.get`. Since we want to get a specific customer we'll also want to add the `id` in the api URL. We can do this with string concatenation. We'll want the callback of the axios call to return the `data` property of the response. We'll also want to dispatch `getCustomer` and pass in our `promise` as a parameter.

```js
import { showCreateCustomer, createCustomer, getCustomer } from '../ducks/workspaceReducer';

export function dispatchGetCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  store.dispatch( getCustomer(promise) );
}
```

Now that our reducer and service file are ready to go, we can edit the component to call our function in our service. Let's open `src/components/List/Customer/Customer.js` and import `dispatchGetCustomer` from `src/services/workspaceService.js`. Then add an `onClick` prop on the `span` element that calls `dispatchGetCustomer` and passes in `id` as an argument.

```js
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

We should now be able to click on a customer in the list and see the editor appear on the right.

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

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3g.gif" />

## Step 10

### Summary

In this step, we'll complete the rest of the workspace reducer to handle updating or removing a customer.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
* Create an `UPDATE_CUSTOMER` action type that equals `"UPDATE_CUSTOMER"`.
* Create a `DELETE_CUSTOMER` action type that equals `"DELETE_CUSTOMER"`.
* Create an `updateCustomer` action creator that has a `promise` parameter:
  * This function return a new object.
  * The object should have a `type` property that equals `UPDATE_CUSTOMER`.
  * The object should have a `payload` property that equals `promise`.
* Create an `deleteCustomer` action creator that has a `promise` parameter:
  * This function return a new object.
  * The object should have a `type` property that equals `DELETE_CUSTOMER`.
  * The object should have a `payload` property that equals `promise`.
* Create an `UPDATE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object will all of previous state's values.
  * The new object should update the `customer` property with a new object that equals `action.payload`.
* Create a `DELETE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object will all of previous state's values.
  * The new object should update `initialLoad` to `true` and `customer` to `{}`.ß

<details>

<summary> Detailed Instructions </summary>

<br />

Now all our reducer needs is a way to update a customer and a way to remove a customer. Let's begin by opening `src/ducks/workspaceReducer.js`. We'll need two action types. One called `UPDATE_CUSTOMER` and one called `DELETE_CUSTOMER`.

```js
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";
```

We'll also need two action creators to go along with these actions types. Let's create an action creator called `updateCustomer` that has a `promise` parameter. This function should return an object with a `type` property that equals `UPDATE_CUSTOMER` and a `payload` property that equals `promise`. We'll also need to make an action creator called `deleteCustomer`. This action creator will be the same except the object it returns should have a `type` property that equals `DELETE_CUSTOMER`.

```js
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export function updateCustomer( promise ) {
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( promise ) {
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}
```

Now that we have our action types and creators, let's update our switch statement in our reducer to handle the `_FULFILLED` cases. Add a case called `UPDATE_CUSTOMER + '_FULFILLED'`. This case should return a new object that has all of previous state and sets customer to a new object that equals the `payload` property of `action`. We'll also want to add a case called `DELETE_CUSTOMER + '_FULFILLED'`. This case should return a new object that has all of previous state and sets `initialLoad` to `true` and `customer` to `{}`.

```js
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
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

    case UPDATE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { customer: Object.assign({}, action.payload) });

    case DELETE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { initialLoad: true, customer: {} });

    default: return state;
  }
}

export function updateCustomer( promise ) {
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( promise ) {
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}
```

</details>

### Solution

<details>

<summary> <code> src/ducks/workspaceReducer.js </code> </summary>

```js
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
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

    case UPDATE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { customer: Object.assign({}, action.payload) });

    case DELETE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { initialLoad: true, customer: {} });

    default: return state;
  }
}

export function updateCustomer( promise ) {
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( promise ) {
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}
```

</details>

## Step 11

### Summary

In this step, we'll complete the reset of the workspace service file to handle updating or removing a customer.

### Instructions

* Open `src/services/workspaceService.js`.
* Import `updateCustomer` and `deleteCustomer` from `src/ducks/workspaceReducer.js`.
* Create and export a function called `dispatchUpdateCustomer`:
  * This function should have an `id` parameter to specify which customer to update in the api URL.
  * This function should have an `obj` parameter to use as the object for the request body.
  * This function should create a promise using `axios.patch`.
  * The callback of the promise should invoke `dispatchGetList` and return the `data` property of the response.
  * This function should use `store.dispatch` to dispatch the `updateCustomer` action creator.
    * Remember this function needs a promise as its first parameter.
* Create and export a function called `dispatchDeleteCustomer`:
  * This function should have an `id` parameter to specify which customer to delete in the api URL.
  * This function should create a promise using `axios.delete`.
  * The callback of the promise should invoke `dispatchGetList`.
  * This function should use `store.dispatch` to dispatch the `deleteCustomer` action creator.
    * Remember this function needs a promise as its first parameter.

<details>

<summary> Detailed Instructions </summary>

<br />

Now we'll need to create and export our http request functions. Let's create a function called `updateCustomer`. This function should have a `id` and `obj` parameter. We'll need the `id` to specify which customer to `patch` in the api URL. `patch` is an HTTP verb that some developers use to say they only want to change part of a record. We only want to change one field at a time, so we'll use 'patch', and we'll need `obj` as the object to `patch` with. `updateCustomer` should create a promise by using `axios.patch` and use `obj` as the request body. In the callback of the axios call we'll want to return the data property of the response.

```js
export const updateCustomer = function(id, obj) {
  return axios.patch(apiURL + id, obj).then(response => {
    return response.data;
  })
}
```

Now let's finish off our service file by creating a `deleteCustomer` function. This function should only need an `id` parameter. We'll want to create a promise using `axios.delete`. The api url should equal `apiURL + id` and the callback of the promise should invoke `dispatchGetList` to update our list of customers after deleting one. After the creation of our promise we'll want to use `store.dispatch` and invoke `deleteCustomer` and pass in `promise` as a parameter.

```js
import { showCreateCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../ducks/workspaceReducer';

export function dispatchUpdateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => {
    dispatchGetList();
    return response.data;
  });
  store.dispatch( updateCustomer(promise) );
}

export function dispatchDeleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( response => {
    dispatchGetList();
  });

  store.dispatch( deleteCustomer( promise ) );
}
```

</details>

### Solution

<details>

<summary> <code> src/services/workspaceService.js </code> </summary>

```js
import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../ducks/workspaceReducer';
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

export function dispatchUpdateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => {
    dispatchGetList();
    return response.data;
  });
  store.dispatch( updateCustomer(promise) );
}

export function dispatchDeleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( response => {
    dispatchGetList();
  });

  store.dispatch( deleteCustomer( promise ) );
}
```

</details>

## Step 12

### Summary

In this step, we'll hook up the Customer editor component to the workspace service file to dispatch actions to our store.

### Instructions

* Open `src/components/Workspace/Customer/ToggleEdit/ToggleEdit.js`.
  * Import `dispatchUpdateCustomer` from `src/services/workspaceService.js`.
  * Locate the `save` method and call `dispatchUpdateCustomer` before `this.setState`.
    * Remember this function needs an `id` argument and `object` argument.
* Open `src/components/Workspace/Customer/RemoveCustomer/RemoveCustomer.js`.
  * Import `dispatchDeleteCustomer` from `src/services/workspaceService.js`.
  * Locate the `remove` method and call `dispatchDeleteCustomer`.
    * Remember this function needs an `id` argument.

<details>

<summary> Detailed Instructions </summary>

<br />

Now for the fun part. Since we have our service and reducer files completed we can go into the remaining components and make our App functional. We'll need to edit two components. The `ToggleEdit` component and `RemoveCustomer` component. Let's begin by opening `src/components/Workspace/Customer/ToggleEdit/ToggleEdit.js`. This component is responsible for all the `Edit` buttons on the customer editor. We'll need to import our `dispatchUpdateCustomer` from `src/services/workspaceService.js`.

```js
import { dispatchUpdateCustomer } from '../../../../services/workspaceService';
```

Then we'll need to udpate the `save` method to call the `dispatchUpdateCustomer`. Remember we need to pass in an `id` and an `object`.

```js
save() {
  dispatchUpdateCustomer( this.props.id, { [this.props.property]: this.state.val } );
  this.setState({ editting: !this.state.editting });
}
```

Using bracket notation, we can create the object all on one line. It's the same thing as doing:

```js
var obj = {};
obj[ this.props.property ] = this.state.val;
dispatchUpdateCustomer( this.props.id, obj );
```

The `property` prop is assigned when the component is loaded on the page. This way we can use one component that can dynamically update all properties of a customer! Freakin' sweet!

Now all that's left is to remove a customer. Let's go into `src/components/Workspace/Customer/RemoveCustomer/RemoveCustomer.js`. We'll need to import the `dispatchDeleteCustomer` from `src/services/workspaceService.js`. And then update the `remove` method to call `dispatchDeleteCustomer` with the value of `id` on props as the first argument.

```js
import { dispatchDeleteCustomer } from '../../../../services/workspaceService';

remove() {
  dispatchDeleteCustomer( this.props.id );
}
```

We can now update any property of a customer and delete a customer!

</details>

### Solution

<details>

<summary> <code> src/components/Workspace/Customer/ToggleEdit/ToggleEdit.js </code> </summary>

```jsx
import React, { Component } from 'react';
import { dispatchUpdateCustomer } from '../../../../services/workspaceService';
import './ToggleEdit.css';

export default class ToggleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.val,
      editting: false
    }

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  handleChange(event) {
    this.setState({ val: event.target.value });
  }

  toggle() {
    this.setState({ editting: !this.state.editting, val: this.props.readOnlyVal })
  }

  save() {
    dispatchUpdateCustomer( this.props.id, { [this.props.property]: this.state.val } );
    this.setState({ editting: !this.state.editting });
  }

  render() {
    const { description, multi } = this.props;
    const { editting, val } = this.state;

    return (
      <div className="CustomerToggleEdit__container">
        {
          multi
          ?
            <textarea className="CustomerToggleEdit__textarea" disabled={ !editting } value={ val } onChange={ this.handleChange } />
          :
            <input className="CustomerToggleEdit__input" disabled={ !editting } placeholder={ description } value={ val } onChange={ this.handleChange } />  
        }
        {
          editting
          ?
            multi
            ?
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle } style={ { position: 'relative', top: '-20px' } }> X </button>
            :
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }> X </button>
          :
            multi
            ?
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle } style={ { position: 'relative', top: '-20px' } }>Edit</button>
            :
              <button className="CustomerToggleEdit__editBtn" onClick={ this.toggle }>Edit</button>
        }
        {
          editting
          ?
            multi
            ?
              <button className="CustomerToggleEdit__saveBtn" onClick={ this.save } style={ { position: 'relative', top: '-20px' } }>Save</button>
            :
              <button className="CustomerToggleEdit__saveBtn" onClick={ this.save }>Save</button>
          :
            null
        }
      </div>
    )
  }
}
```

</details>

<details>

<summary> <code> src/components/Workspace/Customer/RemoveCustomer/RemoveCustomer.js </code> </summary>

```jsx
import React, { Component } from "react";
import './RemoveCustomer.css';

import { dispatchDeleteCustomer } from '../../../../services/workspaceService';

export default class RemoveCustomer extends Component {
  constructor() {
    super();
    this.state = {
      showConfirm: false
    };

    this.toggle = this.toggle.bind( this );
    this.remove = this.remove.bind( this );
  }

  toggle() {
    this.setState({ showConfirm: !this.state.showConfirm });
  }

  remove() {
    dispatchDeleteCustomer( this.props.id );
  }

  render() {
    return (
      <div id="RemoveCustomer__container">
        <button className="RemoveCustomer__removeBtn" onClick={ this.toggle } disabled={ this.state.showConfirm }> Remove </button>
        {
          this.state.showConfirm
          ?
            <div id="RemoveCustomer__confirmationContainer">
              <button id="RemoveCustomer__cancelBtn" onClick={ this.toggle }> Cancel </button>
              <button className="RemoveCustomer__removeBtn" onClick={ this.remove }> Confirm </button>
            </div>
          :
            null
        }
      </div>
    )
  }
}
```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/4g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>
