<template>
  <div class="md:flex w-full">
    <Header class="md:flex-grow-0 md:w-2/12  text-gray-800 h-screen"  />
    <Nuxt class="md:flex-grow md:w-11/12 bg-base_gray bg-opacity-25 text-gray-800" />
    <!-- <Footer class="md:flex-grow-0 md:w-1/12 h-screen  text-gray-800" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore, UserStore, itemInfoStore } from '../store';

export default Vue.extend({
  async fetch() {
    // stateの中身が空だったらdbから商品とトッピングのデータを取得
    if (ItemsStore.items.length === 0 && ToppingsStore.toppings.length === 0) {
      const fetchItemsFromStore = ItemsStore.fetchItemsAct();
      const fetchToppingsFromStore = ToppingsStore.fetchToppingsAct();
      await Promise.all([fetchItemsFromStore, fetchToppingsFromStore]);
    }
    if (UserStore.userInfo) {
     const fetchSignupInfo = UserStore.fetchSignupInfoAct();
     const fetchitemInfo = itemInfoStore.fetchitemInfoAct();
     await Promise.all([fetchSignupInfo,fetchitemInfo])
    } 
  },
});
</script>
