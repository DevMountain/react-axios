import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../ducks/workspaceReducer';
import { getList } from '../ducks/listReducer';

export function dispatchShowCreateCustomer() {
  store.dispatch( showCreateCustomer() );
}

export function dispatchCreateCustomer( obj ) {
  const promise = axios.post( apiURL, obj ).then( response => {
    getList();
  });

  store.dispatch( createCustomer(promise) );
}

export function dispatchGetCustomer( id ) {
  const promise = axios.get( apiURL + id ).then( response => response.data );
  store.dispatch( getCustomer(promise) );
}

export function dispatchUpdateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => {
    getList();
    return response.data;
  });
  store.dispatch( updateCustomer(promise) );
}

export function dispatchDeleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( response => {
    getList();
  });

  store.dispatch( deleteCustomer( promise ) );
}
