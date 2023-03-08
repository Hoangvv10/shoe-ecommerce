import Home from '~/pages/Home';
import Men from '~/pages/Men';
import Women from '~/pages/Women';
import All from '~/pages/All';
import Sale from '~/pages/Sale';
import Product from '~/pages/Product';
import Checkout from '~/pages/Checkout';
import Kid from '~/pages/Kid';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/men', component: Men },
    { path: '/woman', component: Women },
    { path: '/all', component: All },
    { path: '/sale', component: Sale },
    { path: '/:title', component: Product },
    { path: '/checkout', component: Checkout, layout: null },
    { path: '/kid', component: Kid },
];

export const privateRoutes = [];
