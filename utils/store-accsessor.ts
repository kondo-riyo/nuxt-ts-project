import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import items from '~/store/items';
import toppings from '~/store/toppings';

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items;
let ToppingsStore: toppings;

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store);
  ToppingsStore = getModule(toppings, store);
}

export { initialiseStores,  ItemsStore, ToppingsStore}