import actionTypes from './actionTypes';
import product from '~/ultis';

export const getHome = () => ({
    type: actionTypes.GET_HOME,
    homeData: product,
});

export const setFilterList = (list) => ({
    type: actionTypes.SET_FILTER_LIST,
    list,
});

export const setPage = (page) => ({
    type: actionTypes.SET_PAGE,
    page,
});

export const setCurShoesID = (sid) => ({
    type: actionTypes.SET_CURRENT_SHOES_ID,
    sid,
});
