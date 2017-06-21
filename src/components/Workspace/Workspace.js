import React from "react";
import './Workspace.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { loading, initialLoad, creating, createCustomer, currentCustomer, saveEdit, removeCustomer} ) {

  return (
    <div id="Workspace__container">
      {
        creating
        ?
          <CreateCustomer createCustomer={createCustomer}/>
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
              <Customer id={currentCustomer.id}
                        first={currentCustomer.first}
                        last={currentCustomer.last}
                        email={currentCustomer.email}
                        phone={currentCustomer.phone}
                        status={currentCustomer.status}
                        log={currentCustomer.log}
                        saveEdit={saveEdit}
                        removeCustomer={removeCustomer}
                        />
      }
    </div>
  )
}

export default Workspace;
