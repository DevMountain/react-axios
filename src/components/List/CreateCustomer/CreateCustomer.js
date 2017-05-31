import React from 'react';
import './CreateCustomer.css';

import { showCreateCustomer } from '../../../ducks/workspaceReducer';
import { connect } from "react-redux";

function CreateCustomer( { showCreateCustomer } ) {
  return (
    <div id="CreateCustomerBtn__container">
      <button id="CreateCustomer__btn" onClick={ showCreateCustomer }> New Customer </button>
    </div>
  )
}

export default connect( state => state, { showCreateCustomer } )( CreateCustomer );