import api from '../api'

export const getProduct = (productId) =>  dispatch => // eslint-disable-line
    api.products.getProduct(productId);

export const getProducts = (productName) =>  dispatch => // eslint-disable-line
    api.products.get(productName);