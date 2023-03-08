import actionTypes from '../actions/actionTypes';

const cartState = {
    cart: [],
};

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART_ITEM:
            let cart1 = state.cart;
            const index1 = cart1.findIndex((x) => x.id === action.payload.item.id);
            action.payload.item.curSize = [...action.payload.item.curSize, action.payload.size];
            action.payload.item.curSize = action.payload.item.curSize.filter(
                (item, index) => action.payload.item.curSize.indexOf(item) === index,
            );

            if (cart1.includes(action.payload.item)) {
                cart1[index1].quantity += 1;
                return {
                    ...state,
                    cart: [...cart1],
                };
            } else {
                return {
                    ...state,
                    cart: [...cart1, action.payload.item],
                };
            }

        case actionTypes.DELETE_ITEM_CART:
            let delCart = state.cart;
            const delIndex = delCart.findIndex((x) => x.id === action.iid);

            state.cart[delIndex].curSize = [];
            delCart.splice(delIndex, 1);

            return {
                ...state,
                cart: [...delCart],
            };

        case actionTypes.DECRE_ITEM_CART:
            let newCart = state.cart;
            const itemIndex = newCart.findIndex((x) => x.id === action.iid);

            if (newCart[itemIndex].quantity === 1) {
                newCart.splice(itemIndex, 1);
            } else {
                newCart[itemIndex].quantity = newCart[itemIndex].quantity - 1;
            }

            return {
                ...state,
                cart: [...newCart],
            };

        case actionTypes.INCRE_ITEM_CART:
            let newCart1 = state.cart;

            const itemIndex1 = newCart1.findIndex((x) => x.id === action.iid);

            newCart1[itemIndex1].quantity = newCart1[itemIndex1].quantity + 1;

            return {
                ...state,
                cart: [...newCart1],
            };
        default:
            return state;
    }
};

export default cartReducer;
