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