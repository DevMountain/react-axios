import React, { Component } from 'react';
import { connect } from "react-redux";
import './List.css';

import { dispatchGetList } from '../../services/listService';

import Customer from './Customer/Customer';
import CreateCustomer from './CreateCustomer/CreateCustomer';

class List extends Component {
  componentDidMount() {
    dispatchGetList();
  }

  render() {
    const {
      loading,
      customerList,
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
          loading
          ?
            <p> Fetching Customers.. </p>
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
  console.log( 'mapStateToProps in List.js:', state );
  return state;
}

export default connect( mapStateToProps )( List );