import React, { Component } from 'react';

import './CreateCustomer.css';

export default class CreateCustomer extends Component {
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
    this.props.createCustomer(customer);
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
