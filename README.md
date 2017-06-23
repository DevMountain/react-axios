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
    * <b>The API has been setup to be delayed by 1 second, so we can work with asynchronous data on the front end.</b>

You should now have two processes running in two separate terminals. If you want to commit changes as you develop, use a third terminal.

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/1g.gif" />

## Step 1

### Summary

We'll begin by creating a service called `customers.js`. This service will hold all the HTTP requests we make to our server for customer information.

### Instructions
* Run `npm install --save axios`.
* Create a file called `customers.js` in your `src` folder.
  * Import axios from 'axios' and apiURL from `scr/api.js`.
  * We've created an `api.js` file in `src/`. This is a good method to follow as it allows you to fix the API url for the service files that use it. This beats having to update the URL one by one in each function in each service file.

### Solution

<details>

<summary> <code> src/customer.js </code> </summary>

```js
import axios from 'axios';
import apiURL from './api';
```

</details>

## Step 2

### Summary

In this step, we will create an HTTP call in our service using a package called `axios`.

This call will be a `GET` request to get the entire customer list.

### Instructions

* Open `src/customers.js`.
* Create and export a function called `getCustomerList`:
  * This function shouldn't use any parameters.
  * This function should create an http call using `axios`:
    * The `axios` call should be a `GET`.
    * The url should be `apiURL`.
    * The callback should return the `data` property of the `response`.

<details>

<summary> Detailed Instructions/Solution </summary>

<br />

Let's open `src/customers.js`. To create our promises we'll be using a package called `axios`.

Let's create a function that will get the customerList from the API. Inside this function we'll use `axios` to create an http request. When using axios, you chain on a method of the API method you want. The primary methods used are `GET`, `PUT`, `DELETE`, `POST`, `PATCH`, and a couple others. You then invoke this method and pass in the URL as the first parameter. The second parameter can be an object that will equal the request's body. Here are a couple examples:

```js
axios.get( 'http://localhost:3000/somePath' );
axios.post( 'http://localhost:3000/somePath', { str: 'This is the request body' } );
```

This will return a promise to which you can then chain a `.then()` that accepts a callback function as the first parameter. The most common first parameter you'll see in the callback function is `response`. This is the response from the API. Here are some examples:

```js
axios.get( 'http://localhost:3000/somePath' ).then( response => response.data );
axios.post( 'http://localhost:3000/somePath', { str: 'This is the request body' } ).then( response => response.data );
```

To get the customerList, we'll want to make an axios call that uses the `get` method. In the callback, we'll want to return the `data` property from the response.

```js
import axios from 'axios';
import apiURL from '../api';

export function getCustomerList() {
  axios.get( apiURL ).then( response => response.data );
}
```
</details>

## Step 3

### Summary

In this step, we'll go into our `App` component and have it fetch the customer list from the API.

### Instructions

* Open `src/components/App.js`.
* Import the `getCustomerList` function from `src/customers.js` using destructuring.
* Create a `componentDidMount` life-cycle method:
  * This method should call the `getCustomerList` function.
  * Chain a .then function to the end of the invokation of `getCustomerList`. Inside this, create an anonymous function which takes in the customerList as a parameter.
  * Inside the anonymous function, invoke setState to set the customerList property on state to the response from our service.

### Solution

<details>

<summary> <code> src/components/App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({customerList: list});
    })
  }


  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                  />
        </div>
      </div>
    )
  }
}

export default App;

```

</details>

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3.png" />

## Step 4

### Summary

In this step, we'll create an HTTP request using axios to create (POST) a customer to the 'database.'

### Instructions

* Open `src/customers.js`.
* Create a function named `postCustomer`:
  * `postCustomer` should take in an object (this will be the information for the new user).
  * This function should use the axios.post() method.
    * The first parameter will be the URL, which is stored in our apiURL variable.
    * The second parameter should be the object that we take in through the parameters for `postCustomer`.
    * After the function, chain on a `.then` function. Inside the .then, put a callback function that will take in the response from the API.
    * Inside the callback function, return the response.

### Solution

<details>

<summary> <code> src/customers.js </code> </summary>

```js
import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const postCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => {
    return response.data;
  })
}
```

</details>


## Step 5

### Summary

In this step, we'll configure our `List` component to show the form to create a new customer.

### Instructions

* First, we need the button in the List component to open the form.
  * Open `src/components/App.js`.
  * Create a function called `startNewCustomer` on the App component. Make sure to bind its context to the App component in the constructor function.
    * `startNewCustomer` should invoke the setState function. The new state should have `creating` equal `true`, `initialLoad` equal `false`, and `currentCustomer` equal `null`.
  * Now pass startNewCustomer down to the List component through props.
    * Add startNewCustomer to the list of props we are destructuring at the top of the render function. Destructuring is a syntax provided by ES6 Javascript. This way, we can do
    ```js
    var {
      selectCustomer,
      startNewCustomer
    } = this.props
    ```
    and it will mean the same thing as
    ```js
    var selectCustomer = this.props.selectCustomer;
    var startNewCustomer = this.props.startNewCustomer;
    ```
    * Now, pass startNewCustomer in props down to the CreateCustomer component.
    * In CreateCustomer, find the onClick, and insert the startNewCustomer function from props.

### Solution

<details>

<summary> <code> src/components/App.js (not entire file)</code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: [],
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

    this.startNewCustomer = this.startNewCustomer.bind(this);
  }
//skipping lines...
startNewCustomer() {
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    })
}
//skipping lines...
<List
  customerList={this.state.customerList || []}
  startNewCustomer={this.startNewCustomer}
  />
```

</details>

<details>

<summary> <code> src/components/List/List.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './List.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';


class List extends Component {

  render() {
    const {
      customerList,
      startNewCustomer
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
            <div id="List__namesContainer">
              { CustomerComponents }
              <CreateCustomer startNewCustomer={startNewCustomer}/>
            </div>
        }
      </div>
    )
  }
}

export default List;

```

</details>

<details>

<summary> <code> src/components/List/CreateCustomer/CreateCustomer.js </code> </summary>

```jsx
import React from 'react';
import './CreateCustomer.css';

export default function CreateCustomer({startNewCustomer}) {
  return (
    <div id="CreateCustomerBtn__container">
      <button id="CreateCustomer__btn" onClick={startNewCustomer}> New Customer </button>
    </div>
  )
}

```

</details>

<br />



## Step 6

### Summary

In this step, we'll finish our CreateCustomer component so it can successfully create a customer.

### Instructions

* Let's go back to `src/components/App.js`.
  * Import the `postCustomer` function from `src/customers.js`.
  * Create a function called `createCustomer` on the App component. Make sure to bind it to the App component's context in the constructor function.
    * `createCustomer` should take in a customer object, and should invoke `postCustomer` with that object.
    * In the `.then` callback function for `createCustomer`,  invoke `getCustomerList`. In the `getCustomerList` `.then` callback, we will call setState to make customerList equal the updated customerList we just received, and to set initialLoad to true.
* Then we'll need to pass the createCustomer function down to the component that needs it. Pass createCustomer down to the Workspace component.
  * Open `src/components/Workspace/Workspace.js`.
  * Add `createCustomer` to the props being desctructured.
  * Pass `createCustomer` through props down to the CreateCustomer component.
  * Modify the `create` method so it invokes `createCustomer` after creating the customer object.
  * Make sure to pass in the customer object as a parameter.

### Solution

<details>

<summary> <code> src/components/App.js (not entire file) </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList, postCustomer } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: [],
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.postCustomer = this.createCustomer.bind(this);
  }
//skipping lines...
postCustomer(customer) {
  createCustomer(customer).then(response => {
    getCustomerList().then(list => {
      this.setState({
        initialLoad:true,
        creating: false,
        customerList: list
      })
    })
  })
}
//skipping lines...
<Workspace initialLoad={this.state.initialLoad}
          createCustomer={this.createCustomer}
          currentCustomer={this.state.currentCustomer}
          creating={this.state.creating}
        />
```

</details>

<details>

<summary> <code> src/components/Workspace/Workspace.js </code> </summary>

```jsx
import React from "react";
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { initialLoad, creating, currentCustomer, createCustomer } ) {

  return (
    <div id="Workspace__container">
      {
        creating
        ?
          <CreateCustomer createCustomer={createCustomer}/>
        :
          initialLoad
          ?
            <div>
              <p> Please select a customer from the left. </p>
            </div>
          :
            currentCustomer
            ?
              <Customer id={currentCustomer.id}
                        first={currentCustomer.first}
                        last={currentCustomer.last}
                        email={currentCustomer.email}
                        phone={currentCustomer.phone}
                        status={currentCustomer.status}
                        log={currentCustomer.log}
                        />
                : null
      }
    </div>
  )
}

export default Workspace;

```

</details>

<details>

<summary> <code> src/components/Workspace/CreateCustomer/CreateCustomer.js (just the create method)</code> </summary>

```jsx
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
```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/2-1g.gif" />

## Step 7

### Summary

In this step, we'll update the customer list to become a navigation list that will update the workspace on the right.

### Instructions

* Open `src/customers.js`.
  * Create a `getCustomer` function.
    * This function should have an `id` parameter.
    * This function should make an axios get call to `apiURL + id`, using the id from the parameters.
      * The `.then` callback should return the data property of the response from the API.
* Open `src/components/App.js`
  * We will import `getCustomer` from the service.
  * Create a `selectCustomer` method on the App component:
    * This function should take in an id and invoke the `getCustomer` function we imported with that id.
      * In the `.then` callback, we will set state to make the currentCustomer to the response from the api and to make initialLoad false.
      * Make sure to bind the context of `selectCustomer` to the App component in the constructor
  * Pass `selectCustomer` down to the List component through props:
    * In `src/components/List/List.js`, add selectCustomer to the list of props we are destructuring at the top of the render function.
    * Pass selectCustomer through props to the Customer component.
* Open `src/components/List/Customer/Customer.js`.
  * Add `selectCustomer` to the props we're destructuring at the top.
  * Write an anonymous arrow function that invokes selectCustomer with the customer id (already destructured from props for you!).

### Solution

<details>

<summary> <code> src/customers.js </code> </summary>

```js
import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const getCustomer = function(id) {
  return axios.get(apiURL+id).then(response => {
    return response.data;
  })
}

export const postCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => {
    return response.data;
  })
}

```

</details>

<details>

<summary> <code> src/components/App.js (not entire file) </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList, postCustomer, getCustomer } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: [],
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
  }
//skipping lines...
selectCustomer(id) {
  getCustomer(id).then(response=> {
      this.setState({
        currentCustomer: response,
        initialLoad: false
      })
    }
}
//skipping lines...
<List
  customerList={this.state.customerList || []}
  startNewCustomer={this.startNewCustomer}
  selectCustomer={this.selectCustomer}
  />
```

</details>

<details>

<summary> <code> src/components/List/List.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './List.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';


class List extends Component {

  render() {
    const {
      customerList,
      startNewCustomer,
      selectCustomer
    } = this.props;

    const CustomerComponents = customerList.map( customer => (
      <Customer
        key={ customer.id }
        id={ customer.id }
        first={ customer.first }
        last={ customer.last }
        selectCustomer={selectCustomer}
      />
    ));

    return (
      <div id="List__container">
        {
            <div id="List__namesContainer">
              { CustomerComponents }
              <CreateCustomer startNewCustomer={startNewCustomer}/>
            </div>
        }
      </div>
    )
  }
}

export default List;

```

</details>

<details>

<summary> <code> src/components/List/Customer/Customer.js </code> </summary>

```jsx
import React from 'react';
import './Customer.css';

export default function Customer( { id, first, last, selectCustomer } ) {
  return (
    <div className="Customer__listName" onClick={()=>selectCustomer(id)}>
      <span>{ first } { last }</span>
    </div>
  )
}

```

</details>

<br />

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/3g.gif" />

## Step 8

### Summary

In this step, we'll add the ability to update our
customers' information.

### Instructions

* Open our customers service: `src/customers.js`.
  * Add and export a function called `updateCustomer`. This function will take in an id and an object. The object will have the property we want to update and its new value.
    * This function should make a patch request to `apiURL+id` with the object as the second parameter. In the `.then` callback function, we will return the data property of the response. This will be the updated customer.
* In `App.js`, we'll create a method on the component called `saveEdit`. This method will take in an id and an object, and will call `updateCustomer` with that data.
  * Inside the `.then` callback, invoke the `getCustomerList` function, with which we will then set state with the new customer list and the updated customer.
  * We will then pass the function down to the components that need it.

<details>

<summary> Detailed Instructions </summary>

<br />
<br />

Now we need a way to update a customer. Let's begin by opening `src/customers.js` to create our HTTP call. We'll create and export a function called `updateCustomer`. It will take in two parameters: an id and an object. This will have the key value pairs of the things we want to change and their new values.  In `updateCustomer`, we'll make an axios patch request. `PATCH` is an http verb that is used to say that we only want to change part of something. Here, we only want to change part of the customer information, so `PATCH` will work for us.

<br/>
<br/>

Go into `src/components/App.js` and import the `updateCustomer` function. Create a method on the App component called `saveEdit`. This method will take in an id and an object, then invoke updateCustomer with those parameters passed in. In the `.then` callback function, we'll invoke `getCustomerList` so we can update our list component. We'll then setState in the `.then` of `getCustomerList`, setting the value of customerList to the list we received, and currentCustomer to the updated customer we received from the API when calling `updateCustomer`. Finally, we'll pass saveEdit down to our Workspace component as a prop.

<br/>
<br/>


In `src/Workspace/Workspace.js`, we need to add `updateCustomer` to the props we are destructuring and pass it down to the Customer component through props. In `src/Workspace/Customer/Customer.js`, we'll do the same - destructure `updateCustomer` from props and pass it down as a prop to Information, Status, and RepairLog.
<br/>
<br/>


In the Information, Status, and RepairLog components, we need to destructure `updateCustomer` and pass down to the ToggleEdit component.
<br/>
<br/>

In `src/components/Workspace/Customer/ToggleEdit/ToggleEdit.js`, find the save method. Have this method invoke the saveEdit function from props, passing in the id from props and an object with the property from props and the value from state:

```js
{[this.props.property]: this.state.val}
```

</details>

### Solution

<details>

<summary> <code> src/customers.js </code> </summary>

```js
import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const getCustomer = function(id) {
  return axios.get(apiURL+id).then(response => {
    return response.data;
  })
}

export const postCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => {
    return response.data;
  })
}

export const updateCustomer = function(id, obj) {
  return axios.patch(apiURL + id, obj).then(response => {
    return response.data;
  })
}
```

</details>

<details>

<summary> <code> src/App.js (not full file) </code> </summary>

```js
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList, postCustomer, getCustomer, updateCustomer } from '../customers';

class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: [],
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }

    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }

//skipping lines...

saveEdit(id, obj) {
  updateCustomer(id, obj).then(updatedCustomer => {
    getCustomerList().then(list=> {
      this.setState({
        customerList: list,
        currentCustomer: updatedCustomer
      })
    })
  })
}

//skipping lines...

<Workspace initialLoad={this.state.initialLoad}
          createCustomer={this.createCustomer}
          currentCustomer={this.state.currentCustomer}
          creating={this.state.creating}
          saveEdit={this.saveEdit}
        />

```

</details>

<details>

<summary> <code> src/components/Workspace/Workspace.js</code> </summary>

```js
import React from "react";
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { initialLoad, creating, createCustomer, currentCustomer, saveEdit} ) {

  return (
    <div id="Workspace__container">
      {
        creating
        ?
          <CreateCustomer createCustomer={createCustomer}/>
        :
          initialLoad
          ?
            <div>
              <p> Please select a customer from the left. </p>
            </div>
          :
            currentCustomer
            ?
              <Customer id={currentCustomer.id}
                        first={currentCustomer.first}
                        last={currentCustomer.last}
                        email={currentCustomer.email}
                        phone={currentCustomer.phone}
                        status={currentCustomer.status}
                        log={currentCustomer.log}
                        saveEdit={saveEdit}
                        />
              : null
      }
    </div>
  )
}

export default Workspace;


```

</details>

<details>

<summary> <code> src/components/Workspace/Customer/Customer.js</code> </summary>

```js
import React from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({ id, first, last, email, phone, status, log, saveEdit }) {

    return (
      <div id="Customer__container">
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } saveEdit={saveEdit}/>
        <Status id={ id } status={ status } saveEdit={saveEdit}/>
        <RepairLog id={ id } log={ log } saveEdit={saveEdit}/>
        <RemoveCustomer id={ id } />
      </div>
    )
}

export default Customer;


```

</details>


<details>

<summary> <code> Information, Status, and RepairLog components</code> </summary>

```js
//Information.js
import React from 'react';
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import './Information.css';

export default function Information( { id, first, last, email, phone, saveEdit }) {
  return (

    <div id="CustomerInformation__container">
      <p id="CustomerInformation__fullName"> { first } { last } </p>
      <p id="CustomerInformation__id"> ID: { id } </p>
      <ToggleEdit id={ id } description="First Name" property="first" val={ first } readOnlyVal={ first } saveEdit={saveEdit}/>
      <ToggleEdit id={ id } description="Last Name" property="last" val={ last } readOnlyVal={ last } saveEdit={saveEdit}/>
      <ToggleEdit id={ id } description="Email" property="email" val={ email } readOnlyVal={ email } saveEdit={saveEdit}/>
      <ToggleEdit id={ id } description="Phone" property="phone" val={ phone } readOnlyVal={ phone } saveEdit={saveEdit}/>
    </div>
  )
}


//Status
import React from 'react';
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import './Status.css';

export default function Status( { id, status, saveEdit } ) {
  return (
    <div id="CustomerStatus__container">
      <h5> Customer Status </h5>
      <ToggleEdit id={ id } description="Customer Status" property="status" val={ status } readOnlyVal={ status } saveEdit={saveEdit}/>
    </div>
  )
}

//RepairLog
import React from "react";
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import './RepairLog.css';

export default function RepairLog({ id, log, saveEdit }) {
    return (
      <div id="CustomerRepairLog__container">
        <h5> Repair Log </h5>
        <ToggleEdit multi id={ id } property="log" val={ log } readOnlyVal={ log } saveEdit={saveEdit}/>
      </div>
    )
}


```

</details>



<details>

<summary> <code> src/components/Workspace/Customer/ToggleEdit/ToggleEdit.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './ToggleEdit.css';

export default class ToggleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.val,
      editing: false
    }

    this.handleChange = this.handleChange.bind( this );
    this.toggle = this.toggle.bind( this );
    this.save = this.save.bind( this );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.val !== this.state.val) {
      this.setState({
        val: nextProps.val
      })
    }
  }

  handleChange(event) {
    this.setState({ val: event.target.value });
  }

  toggle() {
    this.setState({ editing: !this.state.editing, val: this.props.readOnlyVal })
  }

  save() {
    this.props.saveEdit(this.props.id, {[this.props.property]: this.state.val});
    this.setState({
      editing: false
    });
  }

  render() {
    var { description, multi } = this.props;
    var { editing, val } = this.state;

    return (
      <div className="CustomerToggleEdit__container">
        {
          multi
          ?
            <textarea className="CustomerToggleEdit__textarea" disabled={ !editing } value={ val } onChange={ this.handleChange } />
          :
            <input className="CustomerToggleEdit__input" disabled={ !editing } placeholder={ description } value={ val } onChange={ this.handleChange } />
        }
        {
          editing
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
          editing
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



## Step 9

### Summary

In this step, we'll create a function `deleteCustomer` in our customers service that will take in an id and send a delete request to the API at `apiURL+id`. Then we'll import that function in App.js and create a function called `removeCustomer`. `removeCustomer` will take in an id and invoke `deleteCustomer` with that id, before refreshing the customer list and resetting state. We'll then pass `removeCustomer` down through props to the RemoveCustomer component that needs it.



### Instructions


* Open our customers service: `src/customers.js`.
  * Create and export a function called `deleteCustomer`. This function should take in an id, so we can tell the API which customer to delete.
  * Inside the function, call the `delete` method from axios.
    * We will send our request to `apiURL+id`.
    * In the `.then` callback function, you can return the response.


* Now we need to pass the function down to the RemoveCustomer component who needs it. Open `src/components/App.js`.
    * Import `deleteCustomer` from our customers service.
    * Create a function on the App component named `removeCustomer`. This function should take in an id, then call `deleteCustomer`, passing in that id. This will tell the API which customer to delete.
      * Bind the context of function `removeCustomer` to the App component.
    * Pass removeCustomer as a prop down to the Customer component.
* Open `src/components/Workspace/Workspace.js`.
    * Add `removeCustomer` to the list of props we are destructuring in the Customer function parameters.
    * Pass removeCustomer as a prop down to the Customer component.
* Open `src/components/Workspace/Customer/Customer.js`.
    * Do the same with `removeCustomer` as we did in Workspace. Destructure the variable in the parameters, then pass it down as props to RemoveCustomer.  
* Open `src/components/Workspace/Customer/RemoveCustomer/RemoveCustomer.js`.
  * Create a function on the component called `removeCustomer`.
  * This function should invoke the `deleteCustomer` function that we just passed down through props.
    * Make sure to pass in the customer id from props as well.
    * Be sure that the function's context is bound to the RemoveCustomer component.
  * pass the component function `removeCustomer` (this.removeCustomer) into the onClick property on the confirm button.
* The `deleteCustomer` function should now be available everywhere we need it - try removing customers to make sure it's working.

### Solution

<details>

<summary> <code> src/customers.js </code> </summary>

```jsx
import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}

export const getCustomer = function(id) {
  return axios.get(apiURL+id).then(response => {
    return response.data;
  })
}

export const postCustomer = function(customer) {
  return axios.post(apiURL, customer).then(response => {
    return response.data;
  })
}

export const updateCustomer = function(id, obj) {
  return axios.patch(apiURL + id, obj).then(response => {
    return response.data;
  })
}

export const deleteCustomer = function(id) {
  return axios.delete(apiURL + id).then(response => {
    return response.data;
  })
}
```

</details>
<details>

<summary> <code> src/components/App.js (not entire file) </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer } from '../customers';

class App extends Component {
  //skipping lines...
  removeCustomer(id) {
    deleteCustomer(id).then(deletedCustomer =>{
      getCustomerList().then(list =>{
        this.setState({
          customerList: list,
          currentCustomer: null,
          initialLoad: true
        })
      })
    })
  }
  //skipping lines...

  <Workspace initialLoad={this.state.initialLoad}
            createCustomer={this.createCustomer}
            currentCustomer={this.state.currentCustomer}
            creating={this.state.creating}
            saveEdit={this.saveEdit}
            removeCustomer={this.removeCustomer}
          />
```

</details>

<details>

<summary> <code> src/components/Workspace/Workspace.js </code> </summary>

```jsx
import React from "react";
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { initialLoad, creating, createCustomer, currentCustomer, saveEdit, removeCustomer} ) {

  return (
    <div id="Workspace__container">
      {
        creating
        ?
          <CreateCustomer createCustomer={createCustomer}/>
        :
          initialLoad
          ?
            <div>
              <p> Please select a customer from the left. </p>
            </div>
          :
            currentCustomer
            :
              <Customer id={currentCustomer.id}
                        first={currentCustomer.first}
                        last={currentCustomer.last}
                        email={currentCustomer.email}
                        phone={currentCustomer.phone}
                        status={currentCustomer.status}
                        log={currentCustomer.log}
                        saveEdit={saveEdit}
                        removeCustomer={removeCustomer}
                        />
                : null
      }
    </div>
  )
}

export default Workspace;

```

</details>

<details>

<summary> <code> src/components/Workspace/Customer/Customer.js </code> </summary>

```jsx
import React from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({ id, first, last, email, phone, status, log, saveEdit, removeCustomer }) {

    return (
      <div id="Customer__container">
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } saveEdit={saveEdit}/>
        <Status id={ id } status={ status } saveEdit={saveEdit}/>
        <RepairLog id={ id } log={ log } saveEdit={saveEdit}/>
        <RemoveCustomer id={ id } removeCustomer={removeCustomer}/>
      </div>
    )
}

export default Customer;
```

</details>

<details>

<summary> <code> src/components/Workspace/Customer/RemoveCustomer/RemoveCustomer.js </code> </summary>

```jsx
import React, { Component } from "react";
import './RemoveCustomer.css';

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
      this.props.removeCustomer(this.props.id);
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

<img src="https://github.com/DevMountain/react-axios/blob/solution/readme-assets/4-1g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>
