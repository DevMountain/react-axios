import apiURL from '../api';

const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  switch( action.type ) {
    // Show Create Customer

    // Create Customer - Fulfilled

    // Get Customer - Pending

    // Get Customer - Fulfilled

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    default: return state;
  }
}

// Action Creators