<template>
  <nav class="space-x-10 space-y-5 w-10">
    <ul class="m-0 p-0">
      <li class="block mb-5 pb-10">
        <router-link to="/">
          <img src="~/assets/img/4.png" class="w-2/3 mt-4 mb-0 mr-auto ml-auto" />
        </router-link>
      </li>
      <!-- <li class="block mb-3 font-bold text-center">
        <router-link to="/">Home</router-link>
      </li> -->
      <!-- <li class="block mb-3 font-bold text-center">
        <router-link to="/Cart">カート</router-link>
      </li> -->
      <li
        v-if="userInfoFromStore"
        class="block mb-3 my-10 text-center font-bold text-base_red"
      >
        {{userInfoFromStore.name }}
      </li>
      <li v-if="userInfoFromStore" class="block mb-3 mt-20 text-center">
        <span class="relative inline-block">
          <router-link to="/Cart">
            <img src="~/assets/img/cart_icon.png" class="w-1/5 inline-block" />
            <span class="absolute inline-flex px-2 py-1 text-xs font-bold leading-none text-red-100 bg-base_red rounded-full">
              {{CartItemFromStore[0].itemInfo.length}}
              <!-- 12 -->
            </span>
          </router-link>
        </span>
      </li>
      <li class="block mb-3 my-10 font-bold text-center" v-if="userInfoFromStore">
        <router-link to="/OrderLog">
         <img src="~/assets/img/rireki.png" class="w-1/5 inline-block" />
        </router-link>
      </li>
      <li v-if="!userInfoFromStore" class="block mb-3 font-bold text-center">
        <router-link to="/signup">会員登録</router-link>
      </li>
      <li title="ログイン" class="block mb-3 my-10 font-bold text-center" v-if="!userInfoFromStore">
        <router-link to="/signin">
         <img src="~/assets/img/login_icon.png" class="w-1/5 inline-block" />
        </router-link>
      </li>
      <li title="ログアウト" class="block mb-3 my-10 text-center" v-if="userInfoFromStore">
        <router-link to="/">
          <button class="font-bold" @click="logout">
            <img src="~/assets/img/logout_icon.png" class="w-1/5 inline-block" />
          </button>
        </router-link>
      </li>
    </ul>
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
    CartItemFromStore(){
      return itemInfoStore.getitemInfo;
    }
  },
});
</script>
