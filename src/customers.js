import axios from 'axios';
import apiURL from './api';

export const getCustomerList = function() {
  return axios.get(apiURL).then(response => {
    return response.data;
  })
}
