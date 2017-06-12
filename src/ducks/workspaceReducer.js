import apiURL from '../api';
import axios from 'axios';

const initialState = {
  loading: false,
  customer: {},
  initialLoad: true,
  creating: false
};

// Action Types
const SHOW_CREATE_CUSTOMER = "SHOW_CREATE_CUSTOMER";
const GET_CUSTOMER = "GET_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Reducer
export default function workspaceReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);
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
      
    case GET_CUSTOMER + "_PENDING":
      return {
        loading: true,
        initialLoad: false,
        creating: false,
        customer: {}
      }

    case GET_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { loading: false, customer: action.payload });

    case UPDATE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { customer: Object.assign({}, action.payload) });

    case DELETE_CUSTOMER + "_FULFILLED":
      return Object.assign({}, state, { initialLoad: true, customer: {} });

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

export function createCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => response.data );
  return {
    type: CREATE_CUSTOMER,
    payload: promise
  }
}

export function getCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  return {
    type: GET_CUSTOMER,
    payload: promise
  }
}

export function updateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => response.data );
  return {
    type: UPDATE_CUSTOMER,
    payload: promise
  }
}

export function deleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( () => id );
  return {
    type: DELETE_CUSTOMER,
    payload: promise
  }
}