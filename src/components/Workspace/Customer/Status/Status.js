import React from 'react';
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import './Status.css';

export default function Status( { id, status, saveEdit } ) {
  return (
    <div id="CustomerStatus__container">
      <h5> Customer Status </h5>
      <ToggleEdit id={ id } description="Customer Status" property="status" val={ status } readOnlyVal={ status } saveEdit={saveEdit}/>
    </div>
  )
}
