import React from "react";
import './Workspace.css';
import { connect } from "react-redux";

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

function Workspace( { apiStatus, initialLoad, creating } ) {
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
            apiStatus.loading
            ?
              <div>
                <p> Fetching customer information.. </p>
              </div>
            :
              apiStatus.error
              ?
                <p> { apiStatus.error } </p>
              :
                <Customer />
      }
    </div>
  )
}

function mapStateToProps( state ) {
  state = state.workspaceReducer;
  return {
    apiStatus: state.apiStatus,
    initialLoad: state.initialLoad,
    creating: state.creating
  };
}

export default connect( mapStateToProps )( Workspace );