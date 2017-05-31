import axios from 'axios';
import store from '../store';
import apiURL from '../api';

import { showCreateCustomer, createCustomer, getCustomer, updateCustomer, deleteCustomer } from '../ducks/workspaceReducer';
import { dispatchGetList } from './listService';

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

export function dispatchUpdateCustomer( id, obj ) {
  const promise = axios.patch( apiURL + id, obj ).then( response => {
    dispatchGetList();
    return response.data;
  });
  store.dispatch( updateCustomer(promise) );
}

export function dispatchDeleteCustomer( id ) {
  const promise = axios.delete( apiURL + id ).then( response => {
    dispatchGetList();
  });

  store.dispatch( deleteCustomer( promise ) );
}
