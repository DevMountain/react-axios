import React from 'react';
import './CreateCustomer.css';

export default function CreateCustomer(props) {
  return (
    <div id="CreateCustomerBtn__container">
      <button id="CreateCustomer__btn" onClick={props.startNewCustomer}>
        {' '}
        New Customer{' '}
      </button>
    </div>
  );
}
