import React from "react";
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { loading, initialLoad, creating } ) {
  return (
    <div id="Workspace__container">
      {
        creating
        ?
          <CreateCustomer />
        :
          initialLoad
          ?
            <div>
              <p> Please select a customer from the left. </p>
            </div>
          :
            loading
            ?
              <div>
                <p> Fetching customer information.. </p>
              </div>
            :
              <Customer />
      }
    </div>
  )
}

export default Workspace;
