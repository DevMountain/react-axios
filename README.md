
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


In `src/Workspace/Workspace.js`, we need to add `saveEdit` to the props we are destructuring and pass it down to the Customer component through props. In `src/Workspace/Customer/Customer.js`, we'll do the same - destructure `updateCustomer` from props and pass it down as a prop to Information, Status, and RepairLog.
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
