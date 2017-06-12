<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we are going to create a customer management tool for a computer repair shop. We'll keep track of basic customer information, such as name/email/phone, current repair statuses, and also a log for notes. This tool will use `axios` to hit an API and will also use `redux-promise-middleware` to asynchronously handle data from the API. The majority of the project has been built out already for you. The parts we'll need to finish include: the store, two reducers, and hooking up the action creators into the components that use them. 

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

In this step, we will create our `store`. Since this tool will be hitting an API we'll need to `npm install redux-promise-middleware` to handle async actions. 

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

If we take a look at our development server, we'll see that our app is currently not compiling correctly. This is because some components are trying to connect to a store that doesn't exist. Let's create this store. Open `src/store.js`. We'll need three things from `redux`: `createStore`, `applyMiddleware`, and `combineReducers`. `createStore` will allows us to export the creation of our store. `applyMiddleware` will allow us to use middleware on actions that go to our reducers. `combineReducers` will allow us to use two different reducers to separate concerns of data.

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

Now that our store is created, we can hook it up to our App in `src/index.js`. This will allow our App to have access to the store and the reducers and will also allow our App to compile correctly. Let's open `src/index.js`. We'll need to import `Provider` from `react-redux` and `store` from `src/store.js`. 

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

Before we actually dive into the code for the component, we'll need to create our actions, action creators, and cases in our reducer in our `src/ducks/listReducer.js` file.

### Instructions

* Open `src/ducks/listReducer.js`.
* Run `npm install --save axios`.
* Import `axios` from `axios` at the top of the file.
* Get familiar with the current structure of the reducer.
* Create an action type called `GET_LIST` that equals `"GET_LIST"`.
* Create an action creator called `getList` that equals a function:
  * This function should create a variable called promise that creates a promise using `axios.get` and the `apiURL`.
    * The `promise` should capture the `response` and return the data from it.
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

Before we can update the `List` component to fetch data from the API, we'll need to setup our list reducer. Let's begin by installing `axios` with npm. Then let's open `src/ducks/listReducer.js` and import `axios` at the top. Since we are using `redux-promise-middleware` our actions that are promises have a string attached to them. It can either be `_FULFILLED`, `_PENDING`, or `_REJECTED`. Since this API cannot fail, we'll just worry about creating cases for `_PENDING` and `_FULFILLED`. 

This reducer will be responsible for fetching customer information and updating the list of customers. Let's create an action type called `GET_LIST` that equals `"GET_LIST"`.

```js
const GET_LIST = "GET_LIST";
```

Then we can create an action creator that uses `GET_LIST` as its type. This action creator will create a promise using `axios`. Since we want to `get` the customers we'll use `axios.get` in combination with the `apiURL` that is being imported at the top. We'll want to capture the response of this promise and return its data.

```js
export function getList() {
  const promise = axios.get( apiURL ).then( response => response.data );
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
import apiURL from "../api";
import axios from "axios";

const initialState = {
  loading: false,
  customerList: []
}

// Action Types
const GET_LIST = "GET_LIST";

// Reducer
export default function listReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);

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
export function getList() {
  const promise = axios.get( apiURL ).then( response => response.data );
  return {
    type: GET_LIST,
    payload: promise
  }
}
```

</details>

## Step 4

### Summary

In this step, we'll go into our `List` component and have it fetch the customer list from the API.

### Instructions

* Open `src/components/List/List.js`.
* Import the `getList` action creator from `src/ducks/listReducer.js`.
* Add a second argument to the `connect` statement at the bottom:
  * The second argument should equal an object with `getList` ( `{ getList }` ).
* Create a `componentDidMount` life-cycle method above the `render` method:
  * This method should call the `getList` function from `props`.

### Solution

<details>

<summary> <code> src/components/List/List.js </code> </summary>

```jsx
import React, { Component } from 'react';
import { connect } from "react-redux";
import './List.css';

import { getList } from '../../ducks/listReducer';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

class List extends Component {
  componentDidMount() {
    this.props.getList();
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

export default connect( mapStateToProps, { getList } )( List );
```

</details>

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3.png" />

## Step 5 

### Summary

In this step, we'll update the workspace reducer to handle showing the `CreateCustomer` component and handle creating a customer. We'll also need to update the `listReducer` to handle refreshing the list of customers.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
* Create two action types:
  * `SHOW_CREATE_CUSTOMER` that equals `"SHOW_CREATE_CUSTOMER"`.
    * This action will update the `Workspace` component to display the `CreateCustomer` component.
  * `CREATE_CUSTOMER` that equals `"CREATE_CUSTOMER"`.
    * This action will add a customer to our database in our API.
    * This action needs to be exported so our list reducer can have access to it.
* Create two action creators:
  * `showCreateCustomer` - This should return an object:
    * This object should have a type property that equals `SHOW_CREATE_CUSTOMER`.
    * This object should have a payload property that equals `null`.
  * `createCustomer` - This should have an `obj` parameter, create a promise, and return an object:
    * This function should create a variable called `promise` that creates a promise using `axios.post` and the `apiURL`:
      * The promise should capture the response and return the data of the response.
    * The returned object should have a type property that equals `CREATE_CUSTOMER`.
    * The returned object should have a payload property that equals `promise`.
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
* Open `src/ducks/listReducer.js`.
* Import the `CREATE_CUSTOMER` action type from `src/ducks/workspaceReducer.js`.
* Create a case for `CREATE_CUSTOMER + '_FULFILLED'`:
  * This case should return a new object with the following properties:
    * `loading` should equal false.
    * `customerList` should be a new array that equals all the previous customers from `customerList` and have the `action.payload` added as the last element of the array.

<details>

<summary> Detailed Instructions </summary>

<br />

Now that our customer list is populating correctly, let's get our `New Customer` button functional. Open `src/ducks/workspaceReducer.js`. This reducer keeps track of what component to display in the `Workspace` component. In order to show the `CreateCustomer` component, we'll have to set the `creating` property on state to true. We'll also update our reducer to handle creating a customer as well. When a customer is created we set `initialLoad` to `true` to display the initial workspace view.

Let's begin by creating the action types. We'll need one called `SHOW_CREATE_CUSTOMER` and one called `CREATE_CUSTOMER`. We'll also need to export `CREATE_CUSTOMER` so our `listReducer` can have access to it.

```js
// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
```

Now let's create an action creator for each type. The action creator should return an object with a type property and also a payload property. The type should equal the action type. The payload for `SHOW_CREATE_CUSTOMER` should be `null` and the payload for `CREATE_CUSTOMER` should be a `promise`.

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

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

The `promise` for `createCustomer` is created by using `axios.post` in combination with the `apiURL` and the passed in `obj`. We are then capturing the response from the API and returning the data from that response. `json-server` will return the customer object as a response. We can then use this in the `listReducer` to update our list of customers.

Let's open `src/ducks/listReducer.js` and import `CREATE_CUSTOMER` at the top of the file. Then in the reducer, create a case for `CREATE_CUSTOMER + '_FULFILLED'`. This case should return an object where `loading` is false and `customerList` is all the previous customer objects plus the new customer object in an array.

```js
case CREATE_CUSTOMER + "_FULFILLED":
  return {
    loading: false,
    customerList: [ ...state.customerList, action.payload ]
  }
```

How does that work?! We are dispatching an action to the workspace reducer but creating a case for the action in the list reducer? The reason this works is because all actions get sent to all reducers. This means that even if you do not have cases for actions in the workspace reducer, they are still going through the list reducer and vice versa. Pretty sweet huh?

Now that our list reducer is setup, let's go back to our workspace reducer and add some cases to the reducer. We'll make a case for `SHOW_CREATE_CUSTOMER` and a case for `CREATE_CUSTOMER + '_FULFILLED'`. `SHOW_CREATE_CUSTOMER` should return a new object with all the previous values on state. The new object should also update the value of `creating` to `true`. This will effectively show the `CreateCustomer` component.  `CREATE_CUSTOMER` should return a new object where `loading` is `false`, `initialLoad` is `true`, `customer` is `{}`, and `creating` is `false`. This will effectively show the initial workspace view after creating a customer is complete.

```js
// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";

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

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

</details>

### Solution

<details>

<summary> <code> src/ducks/listReducer.js </code> </summary>

```js
import apiURL from "../api";
import axios from "axios";
import { CREATE_CUSTOMER } from './workspaceReducer';

const initialState = {
  loading: false,
  customerList: []
}

// Action Types
const GET_LIST = "GET_LIST";

// Reducer
export default function listReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);

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

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        customerList: [ ...state.customerList, action.payload ]
      }

    default: return state;
  }
}

// Action Creators
export function getList() {
  const promise = axios.get( apiURL ).then( response => response.data );
  return {
    type: GET_LIST,
    payload: promise
  }
}
```

</details>

<details>

<summary> <code> src/ducks/workspaceReducer.js </code> </summary>

```js
import apiURL from '../api';
import axios from 'axios';

const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";

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

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
```

</details>

## Step 6

### Summary

In this step, we'll configure our `List` component to show the form to create a new customer. We'll also update the `CreateCustomer` component to successfully create a customer.

### Instructions

* Open `src/components/List/CreateCustomer/CreateCustomer.js`.
  * Import `connect` from `"react-redux"`.
  * Import `showCreateCustomer` from `src/ducks/workspaceReducer.js`.
  * Modify the `CreateCustomer` component to use `connect` and be sure to pass in `showCreateCustomer` so that it will be available as a `prop`.
  * Add an `onClick` prop on the `button` element that calls `showCreateCustomer` from `props`.
* Open `src/components/Workspace/CreateCustomer/CreateCustomer.js`.
  * Import `connect` from `"react-redux"`.
  * Import `createCustomer` from `src/ducks/workspaceReducer.js`.
  * Modify the `CreateCustomer` component to use `connect` and be sure to pass in `createCustomer` so that it will be available as a `prop`.
  * In the `create` method invoke `createCustomer` with `customer` as the first parameter.

### Solution

<details>

<summary> <code> src/components/List/CreateCustomer/CreateCustomer.js </code> </summary>

```jsx
import React from 'react';
import './CreateCustomer.css';

import { connect } from "react-redux";
import { showCreateCustomer } from '../../../ducks/workspaceReducer';

function CreateCustomer({ showCreateCustomer }) {
  return (
    <div id="CreateCustomerBtn__container">
      <button id="CreateCustomer__btn" onClick={ showCreateCustomer }> New Customer </button>
    </div>
  )
}

export default connect( state => state, { showCreateCustomer } )( CreateCustomer );
```

</details>

<details>

<summary> <code> src/components/Workspace/CreateCustomer/CreateCustomer.js </code> </summary>

```jsx
import React, { Component } from 'react';
import { connect } from "react-redux";
import { createCustomer } from '../../../ducks/workspaceReducer';

import './CreateCustomer.css';

class CreateCustomer extends Component {
  constructor() {
    super();
    this.state = {
      first: '',
      last: '',
      email: '',
      phone: ''
    }

    this.handleChange = this.handleChange.bind( this );
    this.create = this.create.bind( this );
  }

  handleChange( property, val ) {
    this.setState({ [property]: val })
  }

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

    this.props.createCustomer( customer );
  }
  
  render() {
    const { first, last, email, phone } = this.state;

    return (
      <div id="CreateCustomer__container">
        <input className="CreateCustomer__input" placeholder="First Name" value={ first } onChange={ (e) => this.handleChange('first', e.target.value) } />
        <input className="CreateCustomer__input" placeholder="Last Name" value={ last } onChange={ (e) => this.handleChange('last', e.target.value) } />
        <input className="CreateCustomer__input" placeholder="Email" value={ email } onChange={ (e) => this.handleChange('email', e.target.value) } />
        <input className="CreateCustomer__input" placeholder="Phone" value={ phone } onChange={ (e) => this.handleChange('phone', e.target.value) } />
        <button id="CreateCustomer__saveBtn" onClick={ this.create }> Create </button>
      </div>
    )
  }
}

export default connect( state => state, { createCustomer } )( CreateCustomer );
```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/2-1g.gif" />

## Step 7

### Summary

In this step, we'll update the customer list to become a navigation list that will update the workspace on the right. This step will be larger than usual. The goal of this step will be to take you through the entire process of creating an action in one step.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
  * Create a `GET_CUSTOMER` action type.
  * Create a `getCustomer` action creator.
    * This action creator should have an `id` parameter.
    * This action creator should create a variable called `promise` that creates a promise using `axios.get` and the `apiURL`.
      * This promise should capture the response and return the data of the response.
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
* Open `src/components/List/Customer/Customer.js`.
  * Import `connect` from `"react-redux"`.
  * Import `getCustomer` from `src/ducks/workspaceReducer.js`.
  * Modify the `Customer` component to use `connect` and be sure to pass in `getCustomer` so that it will be available as a `prop`.
  * Add an `onClick` prop to the `span` element that calls `getCustomer` and passes in `id` as an argument.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `src/ducks/workspaceReducer.js`. We are going to need an action type called `GET_CUSTOMER`. We will use the action when a user clicks on a name in the `List` component. Let's also create an action creator called `getCustomer` that has an `id` parameter. This function should create a variable called `promise` the creates a promise using `axios.get` with the `apiURL` and the `id` added on to the end of the url. The promise should capture the response and return the data of the response. This function should return an object with a `type` property that equals `GET_CUSTOMER` and a `payload` property that equals `promise`.

```js
const GET_CUSTOMER = "GET_CUSTOMER";

export function getCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}
```

Now let's update our reducer to handle the action of `GET_CUSTOMER`. We'll need a case for `GET_CUSTOMER + '_PENDING'` and `GET_CUSTOMER + '_FULFILLED'`. When a customer is pending we'll update the `Workspace` component to display that to the user. When a customer is fulfilled we'll update the `Workspace` component to show the editor for a customer. 

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
```

Now that our reducer is setup to handle getting a customer, we can edit the component to call our action creator. Let's open `src/components/List/Customer/Customer.js` and import `connect` from `"react-redux"` and `getCustomer` from `src/ducks/workspaceReducer.js`. We'll then want to modify the component to use `connect` and pass in `getCustomer` so we can use it as a `prop` in the component. 

```jsx
import React from 'react';
import './Customer.css';

import { connect } from "react-redux";
import { getCustomer } from '../../../ducks/workspaceReducer';

function Customer( { id, first, last, getCustomer } ) {
  return (
    <div className="Customer__listName">
      <span>{ first } { last }</span>
    </div>
  )
}

export default connect( state => state, { getCustomer } )( Customer );
```

We can then add an `onClick` prop on the `span` element that calls `getCustomer` and passes in `id` as an argument.

```js
<span onClick={ () => getCustomer( id ) }>{ first } { last }</span>
```

We should now be able to click on a customer in the list and see the editor appear on the right.

</details>

### Solution

<details>

<summary> <code> src/ducks/workspaceReducer.js </code> </summary>

```js
import apiURL from '../api';
import axios from 'axios';

const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
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

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}

export function getCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}
```

</details>

<details>

<summary> <code> src/components/List/Customer/Customer.js </code> </summary>

```jsx
import React from 'react';
import './Customer.css';

import { connect } from "react-redux";
import { getCustomer } from '../../../ducks/workspaceReducer';

function Customer( { id, first, last, getCustomer } ) {
  return (
    <div className="Customer__listName">
      <span onClick={ () => getCustomer( id ) }>{ first } { last }</span>
    </div>
  )
}

export default connect( state => state, { getCustomer } )( Customer );
```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3g.gif" />

## Step 8 ( start here )

### Summary

In this step, we'll complete the rest of the workspace reducer and list reducer to handle updating or removing a customer.

### Instructions

* Open `src/ducks/workspaceReducer.js`.
* Create and export an `UPDATE_CUSTOMER` action type that equals `"UPDATE_CUSTOMER"`.
* Create and export a `DELETE_CUSTOMER` action type that equals `"DELETE_CUSTOMER"`.
* Create an `updateCustomer` action creator that has an `id` and `obj` parameter:
  * This function should create a variable called `promise` that creates a promise using `axios.patch`.
    * The promise URL should equal the `apiURL` + the `id`.
    * The promise should use `obj` as the request body.
    * The promise should capture the response and return the data of the response.
  * This function return a new object.
  * The object should have a `type` property that equals `UPDATE_CUSTOMER`.
  * The object should have a `payload` property that equals `promise`.
* Create an `deleteCustomer` action creator that has a `id` parameter:
  * This function should create a variable called `promise` that creates a promise using `axios.delete`.
    * The promise URL should equal the `apiURL` + the `id`.
    * The promise should use a function that returns the `id`.
  * This function return a new object.
  * The object should have a `type` property that equals `DELETE_CUSTOMER`.
  * The object should have a `payload` property that equals `promise`.
* Create an `UPDATE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object will all of previous state's values.
  * The new object should update the `customer` property with a new object that equals `action.payload`.
* Create a `DELETE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object will all of previous state's values.
  * The new object should update `initialLoad` to `true` and `customer` to `{}`.
* Open `src/ducks/listReducer.js`
* Import `UPDATE_CUSTOMER` and `DELETE_CUSTOMER` from `src/ducks/workspaceReducer.js`.
* Create an `UPDATE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object:
    * `loading` should equal false.
    * `customerList` should equal an array of all customers with the new customer replacing the old customer object.
* Create a `DELETE_CUSTOMER + '_FULFILLED'` case in the reducer:
  * This case should return a new object:
    * `loading` should equal false.
    * `customerList` should equal an array of all customers with the deleted customer filtered out.

<details>

<summary> Detailed Instructions </summary>

<br />

Now all our reducer needs is a way to update a customer and a way to remove a customer. Let's begin by opening `src/ducks/workspaceReducer.js`. We'll need two action types. One called `UPDATE_CUSTOMER` and one called `DELETE_CUSTOMER`. We'll also want to `export` these action types so our list reducer can `import` them.

```js
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
```

We'll also need two action creators to go along with these actions types. Let's create an action creator called `updateCustomer` that has an `id` and `obj` parameter. This function should create a promise using `axios.patch`. The api URL should equal `apiURL` + `id`. The promise should use `obj` as the request body. The request body is the second argument of `axios.patch`. The promise should also capture the response and return the data of the response. This function should also return an object with a `type` property that equals `UPDATE_CUSTOMER` and a `payload` property that equals `promise`.

```js
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export function updateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => response.data );
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}
```

We'll then want to add a `deleteCustomer` action creator. This function should have an `id` parameter. We can then create a promise using `axios.delete`. The URL will equal `apiURL` + `id`. Since the `json-server` doesn't return any useful information on a `delete` call, we won't be capturing the response. Instead let's use an arrow function that returns the `id`. That way our list reducer can know which customer to remove from the customer list. This function should return an object with a `type` property that equals `DELETE_CUSTOMER` and a `payload` property that equals `promise`.

```js
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export function updateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => response.data );
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( () => id );
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}
```

Now that we have our action types and creators, let's update our switch statement in our reducer to handle the `_FULFILLED` cases. Add a case called `UPDATE_CUSTOMER + '_FULFILLED'`. This case should return a new object that has all of previous state and sets customer to a new object that equals the `payload` property of `action`. We'll also want to add a case called `DELETE_CUSTOMER + '_FULFILLED'`. This case should return a new object that has all of previous state and sets `initialLoad` to `true` and `customer` to `{}`.

```js
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

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

    case UPDATE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { customer: Object.assign({}, action.payload) });

    case DELETE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { initialLoad: true, customer: {} });

    default: return state;
  }
}

export function updateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => response.data );
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( () => id );
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
import apiURL from '../api';
import axios from 'axios';

const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const GET_CUSTOMER = "GET_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
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

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}

export function getCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}

export function updateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => response.data );
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( () => id );
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}
```

</details>

## Step 9

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
    * Rememver this function needs an `id` argument.

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
