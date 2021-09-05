<template>
  <nav class="sm:space-x-10 sm:space-y-5 sm:w-10 mt-0 bg-white">
    <div class="flex flex-row sm:flex-col items-end">
      <div class="sm:block sm:mb-5 sm:pb-5 w-1/3 sm:w-full">
        <router-link to="/">
          <img src="~/assets/img/4.png" class="w-20 sm:w-full p-1 mt-4 mb-0 mr-auto ml-auto " />
        </router-link>
      </div>
      <div
        v-if="userInfoFromStore"
        class="sm:block mb-3 sm:mb-13 sm:mt-10 text-center font-bold self-end sm:self-center text-base_red"
      >
        {{userInfoFromStore.name }}
      </div>
      <!-- <span class="flex flex-row justify-end bg-red-100 w-4/6"> -->
      <div v-if="userInfoFromStore" class="block w-1/6 sm:w-full mb-3 sm:mb-3 sm:mt-20 text-center justify-self-end">
        <span class="relative inline-block">
          <router-link to="/Cart">
            <img src="~/assets/img/cart_icon.png" class="w-10 sm:w-1/3 inline-block" />
            <!-- <span v-if="ItemInfoFromStore.length&&ItemInfoFromStore[0].itemInfo.length" class="absolute inline-flex px-2 py-1 text-xs font-bold leading-none text-red-100 bg-base_red rounded-full">
              {{ItemInfoFromStore[0].itemInfo.length}}
            </span> -->
          </router-link>
        </span>
      </div>
      <div class="block w-1/6 sm:w-full mb-3 sm:my-10 font-bold inline-block bottom-0 right-0 text-center" v-if="userInfoFromStore">
        <router-link to="/OrderLog">
         <img src="~/assets/img/rireki.png" class="w-10 sm:w-1/3 inline-block" />
        </router-link>
      </div>
      <div v-if="!userInfoFromStore" class="block mb-3 font-bold text-center">
        <router-link to="/signup">会員登録</router-link>
      </div>
      <div title="ログイン" class="block mb-3 sm:my-10 font-bold text-center" v-if="!userInfoFromStore">
        <router-link to="/signin">
         <img src="~/assets/img/login_icon.png" class="w-10 sm:w-1/3 inline-block" />
        </router-link>
      </div>
      <div title="ログアウト" class="block mb-3 sm:my-10 w-1/6 sm:w-full text-center justify-self-end" v-if="userInfoFromStore">
        <router-link to="/">
          <button class="font-bold" @click="logout">
            <img src="~/assets/img/logout_icon.png" class="w-10 sm:w-1/3 inline-block" />
          </button>
        </router-link>
      </div>
      <!-- </span> -->
      </div>
  </nav>
</template>

<script>
import { UserStore,itemInfoStore } from '../store';
import Vue from 'vue';
export default Vue.extend({
  methods: {
    logout() {
      if (this.userInfoFromStore) {
        UserStore.logout();
      }
    },
  },
  computed: {
    userInfoFromStore() {
      return UserStore.getUserInfo;
    },
    uidFromStore(){
      return UserStore.getUid;
    },
    ItemInfoFromStore(){
      return itemInfoStore.itemInfo;
    }
  },
});
</script>
