<template>
  <div class="grid justify-items-center w-full">
    <div
      class="
        max-w-2xl
        rounded
        text-center
        bg-base_of
        overflow-hidden
        rounded-2xl
        m-5
      "
    >
      <img class="w-full" src="~/assets/img/ordercomp.png" />
      <div class="px-6 pt-4 text-base_red">
        <div v-if="userInfoFromStore" class="font-bold text-xl">
          {{ userInfoFromStore.name }} 様
        </div>
        <div class="font-bold sm:text-xl my-2">
          この度はご購入いただきありがとうございました
        </div>
        <p class="text-base sm:text-lg font-semibold mt-2">
          ご購入いただいた商品は、<br />注文履歴よりご確認いただけます。<br />
        </p>
        <p class="animate-bounce text-2xl font-bold mt-1 font-base_gray">↓</p>
      </div>
      <div>
        <button
          class="
            bg-base_red
            hover:bg-base_orange
            text-base_cream
            font-bold
            py-2
            px-6
            rounded-full
          "
        >
          <router-link to="OrderLog">注文内容を確認する</router-link>
        </button>
      </div>
      <div class="py-2">
        <button
          class="
            bg-base_red
            hover:bg-base_orange
            text-base_cream
            font-bold
            py-2
            px-12
            rounded-full
          "
        >
          <router-link to="/"> ホームに戻る </router-link>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { UserStore } from '../store';
import { userInfoType } from '../types/userInfoType';
export default Vue.extend({
  computed: {
    userInfoFromStore(): userInfoType | null {
      return UserStore.getUserInfo;
    },
  },
  head() {
    return {
      title: '注文完了',
    };
  },
});
</script>
