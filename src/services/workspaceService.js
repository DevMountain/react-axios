import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer, getCustomer } from '../ducks/workspaceReducer';
import { dispatchGetList } from '../services/listService';

export function dispatchShowCreateCustomer() {
  store.dispatch( showCreateCustomer() );
}

export function dispatchCreateCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => {
    dispatchGetList();
  });

  store.dispatch( createCustomer(promise) );
}

export function dispatchGetCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  store.dispatch( getCustomer(promise) );
}