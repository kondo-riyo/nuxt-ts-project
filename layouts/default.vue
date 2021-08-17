<template>
<div class="flex h-screen w-full">
  <Header class="flex-grow-0 w-2/12 h-full "/>
  <Nuxt class="flex-grow w-11/12 h-full bg-gray-100"/>
  <Footer class="flex-grow-0 w-1/12 h-full"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ItemsStore,ToppingsStore } from '../store'

export default Vue.extend({
  async fetch() {
    // stateの中身が空だったらdbから商品とトッピングのデータを取得
    // ↑fetchフックが発動する度に繰り返しデータを取得することを防ぐ
    if (ItemsStore.items.length === 0 && ToppingsStore.toppings.length === 0) {
      const fetchItemsFromStore = ItemsStore.fetchItemsAct();
      const fetchToppingsFromStore = ToppingsStore.fetchToppingsAct();
      await Promise.all([fetchItemsFromStore,fetchToppingsFromStore]);
    }
  },

})
</script>
