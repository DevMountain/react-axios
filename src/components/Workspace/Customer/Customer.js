import React from "react";
import './Customer.css';
import { connect } from "react-redux";

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer( { id, first, last, email, phone, status, log } ) {
  return (
    <div id="Customer__container">
      <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } />
      <Status id={ id } status={ status } />
      <RepairLog id={ id } log={ log } />
      <RemoveCustomer id={ id } />
    </div>
  )
}

function mapStateToProps( state ) {
  state = state.workspaceReducer;
  console.log( 'mapStateToProps in Workspace/Customer.js:', state );
  return state.customer;
}

export default connect( mapStateToProps )( Customer );