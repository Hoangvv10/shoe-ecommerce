import actionTypes from '../actions/actionTypes';

const initState = {
    data: [],
    menData: [],
    list: [],
    womenData: [],
    page: null,
    saleData: [],
    curShoeId: null,
};

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                data: action.homeData,
                menData: action.homeData.filter((item) => item.genders.includes('MEN')),
                womenData: action.homeData.filter((item) => item.genders.includes('WOMEN')),
                saleData: action.homeData.filter((item) => item.isSale === true),
            };

        case actionTypes.SET_FILTER_LIST:
            return {
                ...state,
                list: action.list,
            };

        case actionTypes.SET_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case actionTypes.SET_CURRENT_SHOES_ID:
            return {
                ...state,
                curShoeId: action.sid,
            };
        default:
            return state;
    }
};

export default appReducer;
