import React from 'react';
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace({
  initialLoad,
  creating,
  currentCustomer,
  createCustomer,
  saveEdit
}) {
  return (
    <div id="Workspace__container">
      {creating ? (
        <CreateCustomer createCustomer={createCustomer} />
      ) : initialLoad ? (
        <div>
          <p> Please select a customer from the left. </p>
        </div>
      ) : currentCustomer ? (
        <Customer
          saveEdit={saveEdit}
          id={currentCustomer.id}
          first={currentCustomer.first}
          last={currentCustomer.last}
          email={currentCustomer.email}
          phone={currentCustomer.phone}
          status={currentCustomer.status}
          log={currentCustomer.log}
        />
      ) : null}
    </div>
  );
}

export default Workspace;
