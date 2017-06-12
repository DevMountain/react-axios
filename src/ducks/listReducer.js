import apiURL from "../api";
import axios from "axios";
import { CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from './workspaceReducer';

const initialState = {
  loading: false,
  customerList: []
}

// Action Types
const GET_LIST = "GET_LIST";

// Reducer
export default function listReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);

  switch( action.type ) {
    case GET_LIST + "_PENDING": 
      return {
        loading: true,
        customerList: []
      }

    case GET_LIST + "_FULFILLED":
      return {
        loading: false,
        customerList: action.payload
      }

    case CREATE_CUSTOMER + "_FULFILLED":
      return {
        loading: false,
        customerList: [ ...state.customerList, action.payload ]
      }

    case UPDATE_CUSTOMER + "_FULFILLED":
      const updateID = state.customerList.findIndex( customer => customer.id === action.payload.id );
      return {
        loading: false,
        customerList: state.customerList.slice(0, updateID).concat( action.payload ).concat(state.customerList.slice(updateID + 1, state.customerList.length ))
      }

    case DELETE_CUSTOMER + "_FULFILLED":
      const deleteID = action.payload;
      return {
        loading: false,
        customerList: state.customerList.filter( customer => customer.id !== deleteID )
      }

    default: return state;
  }
}

// Action Creators
export function getList() {
  const promise = axios.get( apiURL ).then( response => response.data );
  return {
    type: GET_LIST,
    payload: promise
  }
}