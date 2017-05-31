import React, { Component } from 'react';
import { connect } from "react-redux";
import './List.css';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

class List extends Component {
  render() {
    const {
      loadingList,
      customerList,
      error
    } = this.props;
    
    const CustomerComponents = customerList.map( customer => (
      <Customer
        key={ customer.id } 
        id={ customer.id }
        first={ customer.first }
        last={ customer.last }
      />
    ));

    return (
      <div id="List__container">
        {
          loadingList
          ?
            <p> Fetching Customers.. </p>
          :
            error
            ?
              <p> { error } </p>
            :
              <div id="List__namesContainer">
                { CustomerComponents }
                <CreateCustomer />
              </div>
        }
      </div>
    )
  }
}

function mapStateToProps( state ) {
  state = state.listReducer;
  return state;
}

export default connect( mapStateToProps )( List );