import actionTypes from '../actions/actionTypes';

const cartState = {
    cart: [],
};

const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART_ITEM:
            let cart1 = state.cart;
            const index1 = cart1.findIndex((x) => x.id === action.payload.id);

            if (cart1.includes(action.payload)) {
                cart1[index1].quantity += 1;
                return {
                    ...state,
                    cart: [...cart1],
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                };
            }

        case actionTypes.DELETE_ITEM_CART:
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.iid),
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
