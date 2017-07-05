import React from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({ id, first, last, email, phone, status, log }) {

    return (
      <div id="Customer__container">
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } />
        <Status id={ id } status={ status } />
        <RepairLog id={ id } log={ log } />
        <RemoveCustomer id={ id } />
      </div>
    )
}

export default Customer;
