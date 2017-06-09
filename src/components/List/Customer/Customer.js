import React from 'react';
import './Customer.css';

import { connect } from "react-redux";
import { getCustomer } from '../../../ducks/workspaceReducer';

function Customer( { id, first, last, getCustomer } ) {
  return (
    <div className="Customer__listName">
      <span onClick={ () => getCustomer( id ) }>{ first } { last }</span>
    </div>
  )
}

export default connect( state => state, { getCustomer } )( Customer );