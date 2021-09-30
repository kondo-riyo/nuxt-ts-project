import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import items from '~/store/items';
import toppings from '~/store/toppings';
import user from '~/store/user';
import cart from '~/store/cart';

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items;
let ToppingsStore: toppings;
let UserStore: user;
//let itemInfoStore: itemInfo;
let CartStore: cart;

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store);
  ToppingsStore = getModule(toppings, store);
  UserStore = getModule(user, store);
 // itemInfoStore = getModule(itemInfo, store);
  CartStore = getModule(cart, store);
}

export { initialiseStores,  ItemsStore, ToppingsStore, UserStore, CartStore}