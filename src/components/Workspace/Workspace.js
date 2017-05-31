import React from "react";
import './Workspace.css';
import { connect } from "react-redux";

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

function mapStateToProps( state ) {
  state = state.workspaceReducer;
  return {
    loading: state.loading,
    initialLoad: state.initialLoad,
    creating: state.creating
  };
}

export default connect( mapStateToProps )( Workspace );