const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const CREATE_CUSTOMER = "CREATE_CUSTOMER";
const GET_CUSTOMER = "GET_CUSTOMER";
const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";
const UPDATE_STATUS = "UPDATE_STATUS";
const UPDATE_LOG = "UPDATE_LOG";
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
  let newState;
  switch( action.type ) {

    case CREATE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { loading: false, initialLoad: true, creating: false });

    case GET_CUSTOMER + "_PENDING":
      return Object.assign({}, state, { loading: true, initialLoad: false, creating: false });

    case GET_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { loading: false, customer: action.payload });

    case UPDATE_STATUS + "_FULFILLED":
      newState = Object.assign({}, state, { customer: Object.assign({}, state.customer) });
      newState.customer.status = action.payload;
      return newState;

    case UPDATE_LOG + "_FULFILLED":
      newState = Object.assign({}, state, { customer: Object.assign({}, state.customer) });
      newState.customer.log = action.payload;
      return newState;

    case UPDATE_CUSTOMER + "_FULFILLED":
      newState = Object.assign({}, state, { customer: Object.assign({}, state.customer) });
      newState.customer = action.payload;
      return newState;

    case DELETE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { initialLoad: true, customer: {} });

    case SHOW_CREATE_CUSTOMER:
      return Object.assign({}, state, { creating: true });

    default: return state;
  }
}

// Action Creators
export function createCustomer( promise ) {
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}

export function getCustomer( promise ) {
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}

export function updateCustomer( promise ) {
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( promise ) {
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}

export function updateStatus( promise ) {
  return {
    type: UPDATE_STATUS,
    payload: promise
  }
}

export function updateLog( promise ) {
  return {
    type: UPDATE_LOG,
    payload: promise
  }
}

export function showCreateCustomer() {
  return {
    type: SHOW_CREATE_CUSTOMER,
    payload: null
  }
}