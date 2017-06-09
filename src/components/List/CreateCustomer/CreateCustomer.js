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