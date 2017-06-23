import React from 'react';
import './Customer.css';

export default function Customer( { id, first, last } ) {
  return (
    <div className="Customer__listName" onClick={ '' }>
      <span>{ first } { last }</span>
    </div>
  )
}
