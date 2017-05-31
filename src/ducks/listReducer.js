const initialState = {
  loadingList: false,
  error: null,
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
        loadingList: true,
        error: null,
        customerList: []
      }

    case GET_LIST + "_FULFILLED":
      return {
        loadingList: false,
        error: null,
        customerList: action.payload
      }

    default: return state;
  }
}

// Action Creators
export function getList( promise ) {
  return {
    type: GET_LIST,
    payload: promise
  }
}