import axios from 'axios';
import { API_URL } from '../utils/api';

export const getAllDishes = () => {

  return axios
    .get(`${API_URL}/dishes`)
    .then((response) => response.data);
};  

export const getDishById = (id) => {

  return axios
    .get(`${API_URL}/dishes/${id}`)
    .then((response) => response.data);
};

export const createDish = (dishData) => {

  return axios
    .post(`${API_URL}/dishes`, dishData)
    .then((response) => response.data);
};

export const updateDish = (id, dishData) => {

  return axios
    .put(`${API_URL}/dishes/${id}`, dishData)
    .then((response) => response.data);
};

export const deleteDish = (id) => {

  return axios 
    .delete(`${API_URL}/dishes/${id}`)
    .then((response) => response.data);
};
