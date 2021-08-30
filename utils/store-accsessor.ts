import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import items from '~/store/items';
import toppings from '~/store/toppings';
import user from '~/store/user';
import itemInfo from '~/store/itemInfo'

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items;
let ToppingsStore: toppings;
let UserStore: user;
let itemInfoStore: itemInfo;

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store);
  ToppingsStore = getModule(toppings, store);
  UserStore = getModule(user, store);
  itemInfoStore = getModule(itemInfo, store)
}

export { initialiseStores,  ItemsStore, ToppingsStore, UserStore, itemInfoStore}