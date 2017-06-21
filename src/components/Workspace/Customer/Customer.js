import React, { Component } from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

class Customer extends Component {
  constructor(props) {
    super(props)
    this.saveEdit = this.saveEdit.bind(this);
  }

  saveEdit(obj) {
    this.props.saveEdit(this.props.id, obj)
  }

  render(){
    var { id, first, last, email, phone, status, log } = this.props;

    return (
      <div id="Customer__container">
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } saveEdit={this.saveEdit}/>
        <Status id={ id } status={ status } saveEdit={this.saveEdit}/>
        <RepairLog id={ id } log={ log } saveEdit={this.saveEdit}/>
        <RemoveCustomer id={ id } saveEdit={this.saveEdit}/>
      </div>
    )
  }
}

export default Customer;
