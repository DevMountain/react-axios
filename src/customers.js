import axios from 'axios';
import apiURL from './api';

export function getCustomerList() {
  return axios.get(apiURL).then(res => {
    return res.data;
  });
}
export function postCustomer(obj) {
  return axios.post(apiURL, obj).then(res => {
    return res.data;
  });
}
export function getCustomer(id) {
  return axios.get(apiURL + id).then(res => {
    return res.data;
  });
}
export function updateCustomer(id, obj) {
  console.log(id, obj);
  return axios.patch(apiURL + id, obj).then(res => res.data);
}
