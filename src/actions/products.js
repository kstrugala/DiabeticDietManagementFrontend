import api from '../api'

export const getProducts = () =>  dispatch =>
{
    // todo
}

export const getProduct = (productId) =>  dispatch =>
    api.products.getProduct(productId);