import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import items from '~/store/items'

// eslint-disable-next-line import/no-mutable-exports
let ItemsStore: items

function initialiseStores(store: Store<any>): void {
  ItemsStore = getModule(items, store)
}

export { initialiseStores,  ItemsStore}