import React from 'react';
import './Customer.css';

import { dispatchGetCustomer } from '../../../services/workspaceService';

export default function Customer( { id, first, last } ) {
  return (
    <div className="Customer__listName">
      <span onClick={ () => dispatchGetCustomer( id ) }>{ first } { last }</span>
    </div>
  )
}