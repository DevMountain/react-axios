import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';

import { getCustomerList, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../customers';

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
    this.removeCustomer = this.removeCustomer.bind(this);
  }

  componentDidMount() {
    getCustomerList().then(list => {
      this.setState({customerList: list});
    })
  }

  startNewCustomer() {
    if (this.state.initialLoad) {
      this.setState({
        creating: true,
        initialLoad: false,
        currentCustomer: null
      })
    } else {
      this.setState({
        creating: true,
        currentCustomer: null
      })
    }
  }

  createCustomer(customer) {
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

  selectCustomer(id) {
    getCustomer(id).then(response=> {
      if (this.state.initialLoad) {
        this.setState({
          currentCustomer: response,
          initialLoad: false
        })
      } else {
        this.setState({
          currentCustomer: response
        })
      }

    })
  }

  saveEdit(id, obj) {
    updateCustomer(id, obj).then(response=> {
      getCustomerList().then(list=> {
        this.setState({
          customerList: response,
          currentCustomer: list.find(el=> el.id === id)
        })
      })
    })
  }

  removeCustomer(id) {
    deleteCustomer(id).then(response=>{
      getCustomerList().then(response=>{
        this.setState({
          customerList: response,
          currentCustomer: null,
          initialLoad: true
        })
      })
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
              loading={this.state.customerList ? false : true}
              startNewCustomer={this.startNewCustomer}
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    createCustomer={this.createCustomer}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    saveEdit={this.saveEdit}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
