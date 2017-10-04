import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import {
  getCustomerList,
  postCustomer,
  getCustomer,
  updateCustomer
} from '../customers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    };
    this.startNewCustomer = this.startNewCustomer.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }
  componentDidMount() {
    getCustomerList().then(customers =>
      this.setState({ customerList: customers })
    );
  }
  startNewCustomer() {
    this.setState({
      creating: true,
      initialLoad: false,
      currentCustomer: null
    });
  }
  createCustomer(obj) {
    postCustomer(obj).then(res => {
      getCustomerList().then(customers =>
        this.setState({ customerList: customers, initialLoad: true })
      );
    });
  }
  selectCustomer(id) {
    getCustomer(id).then(res => {
      this.setState({ currentCustomer: res, initialLoad: false });
    });
  }
  saveEdit(id, obj) {
    updateCustomer(id, obj).then(customer => {
      getCustomerList().then(customers =>
        this.setState({ customerList: customers, currentCustomer: customer })
      );
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {this.state.customerList ? (
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              selectCustomer={this.selectCustomer}
            />
          ) : null}
          <Workspace
            saveEdit={this.saveEdit}
            initialLoad={this.state.initialLoad}
            currentCustomer={this.state.currentCustomer}
            creating={this.state.creating}
            createCustomer={this.createCustomer}
          />
        </div>
      </div>
    );
  }
}

export default App;
