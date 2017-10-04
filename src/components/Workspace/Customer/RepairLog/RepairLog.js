import React from 'react';
import ToggleEdit from '../ToggleEdit/ToggleEdit';
import './RepairLog.css';

export default function RepairLog({ id, log, saveEdit }) {
  return (
    <div id="CustomerRepairLog__container">
      <h5> Repair Log </h5>
      <ToggleEdit
        saveEdit={saveEdit}
        multi
        id={id}
        property="log"
        val={log}
        readOnlyVal={log}
      />
    </div>
  );
}
