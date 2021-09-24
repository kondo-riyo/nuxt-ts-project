<template>
  <div class="sm:flex w-full">
    <Header class="sm:flex-grow-0 w-full sm:w-1/12  text-gray-800 sm:h-screen sm:fixed"  />
    <Nuxt class="sm:flex-grow sm:w-11/12 bg-base_gray bg-opacity-25 min-h-screen text-gray-800 sm:ml-20" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore, UserStore, itemInfoStore, CartStore } from '../store';

export default Vue.extend({
  async fetch(): Promise<void> {
    // stateの中身が空だったらdbから商品とトッピングのデータを取得
    if (ItemsStore.items.length === 0 && ToppingsStore.toppings.length === 0) {
      const fetchItemsFromStore = ItemsStore.fetchItemsAct();
      const fetchToppingsFromStore = ToppingsStore.fetchToppingsAct();
      await Promise.all([fetchItemsFromStore, fetchToppingsFromStore]);
    }
    if (UserStore.userInfo) {
     const fetchSignupInfo = UserStore.fetchSignupInfoAct();
     const fetchitemInfo = itemInfoStore.fetchitemInfoAct();
     //const cartitemInfo = CartStore.fetchCartAct()
     await Promise.all([fetchSignupInfo,fetchitemInfo])
    } 
  },
});
</script>
