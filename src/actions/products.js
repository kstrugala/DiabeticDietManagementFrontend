import api from '../api'

export const getProduct = (productId) =>  dispatch =>
    api.products.getProduct(productId);

export const getProducts = (productName) =>  dispatch =>
    api.products.get(productName);