const initialState = {
  loading: false,
  customerList: []
}

// Action Types


// Reducer
export default function listReducer( state = initialState, action ) {
  if ( action.type !== "@@redux/INIT" && !action.type.includes("@@redux/PROBE_UNKNOWN_ACTION") ) console.log('Action:', action);

  switch( action.type ) {
    // Pending

    // Fulfilled

    default: return state;
  }
}

// Action Creators
