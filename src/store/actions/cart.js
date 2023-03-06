import actionTypes from './actionTypes';

export const setCart = (items) => ({
    type: actionTypes.SET_CART_ITEM,
    payload: items,
});

export const increItem = (iid) => ({
    type: actionTypes.INCRE_ITEM_CART,
    iid,
});

export const decreItem = (iid) => ({
    type: actionTypes.DECRE_ITEM_CART,
    iid,
});

export const deleteItem = (iid) => ({
    type: actionTypes.DELETE_ITEM_CART,
    iid,
});
