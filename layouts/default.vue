<template>
  <div class="md:flex h-screen w-full">
    <Header class="md:flex-grow-0 md:w-2/12 h-screen  text-gray-800" />
    <Nuxt class="md:flex-grow md:w-11/12 h-screen bg-gray-100  text-gray-800" style="background-image: url()" />
    <!-- <Footer class="md:flex-grow-0 md:w-1/12 h-screen  text-gray-800" /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore, UserStore, itemInfoStore } from '../store';

export default Vue.extend({
  async fetch() {
    // stateの中身が空だったらdbから商品とトッピングのデータを取得
    // ↑fetchフックが発動する度に繰り返しデータを取得することを防ぐ
    if (ItemsStore.items.length === 0 && ToppingsStore.toppings.length === 0) {
      const fetchItemsFromStore = ItemsStore.fetchItemsAct();
      const fetchToppingsFromStore = ToppingsStore.fetchToppingsAct();
      await Promise.all([fetchItemsFromStore, fetchToppingsFromStore]);
    }
    if (UserStore.userInfo) {
      console.log('会員情報とオーダー情報を取得');
     const fetchSignupInfo = UserStore.fetchSignupInfoAct();
     const fetchitemInfo = itemInfoStore.fetchitemInfoAct();
     await Promise.all([fetchSignupInfo,fetchitemInfo])
    } 
  },
  // created(){
  //       // ログインしていればdbの会員情報をストアに保存
  //   if(UserStore.userInfo){
  //    UserStore.fetchSignupInfo();
  //   }
  // }
});
</script>
