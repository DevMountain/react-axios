import React from 'react';
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({
  id,
  first,
  last,
  email,
  phone,
  status,
  log,
  saveEdit,
  removeCustomer
}) {
  return (
    <div id="Customer__container">
      <Information
        saveEdit={saveEdit}
        id={id}
        first={first}
        last={last}
        email={email}
        phone={phone}
      />
      <Status saveEdit={saveEdit} id={id} status={status} />
      <RepairLog saveEdit={saveEdit} id={id} log={log} />
      <RemoveCustomer removeCustomer={removeCustomer} id={id} />
    </div>
  );
}

export default Customer;
