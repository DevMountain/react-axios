import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer } from '../ducks/workspaceReducer';

export function dispatchShowCreateCustomer() {
  store.dispatch( showCreateCustomer() );
}

export function dispatchCreateCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => {
    dispatchGetList();
  });

  store.dispatch( createCustomer(promise) );
}