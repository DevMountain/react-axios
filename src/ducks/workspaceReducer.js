const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const CREATE_CUSTOMER = "CREATE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
  let newState;
  switch( action.type ) {
    case SHOW_CREATE_CUSTOMER:
      return Object.assign({}, state, { creating: true });

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        initialLoad: true,
        creating: false,
        customer: {}
      }

    // Get Customer - Pending

    // Get Customer - Fulfilled

    // Get Customer - Rejected

    // Update Status - Fulfilled

    // Update Log - Fulfilled

    // Update Customer - Fulfilled

    // Delete Customer - Fulfilled

    // Show Create Customer

    default: return state;
  }
}

// Action Creators
export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}

export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}
