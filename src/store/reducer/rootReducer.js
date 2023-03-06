import appReducer from './appReducer';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import cartReducer from './cartReducer';

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const appConfig = {
    ...commonConfig,
    key: 'data',
    whitelist: ['curShoeId'],
};

const cartConfig = {
    ...commonConfig,
    key: 'cart',
    whitelist: ['cart'],
};

const rootReducer = combineReducers({
    app: persistReducer(appConfig, appReducer),
    cart: persistReducer(cartConfig, cartReducer),
});

export default rootReducer;
