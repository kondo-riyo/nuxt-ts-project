<template>
  <div>
    <div
      type="text"
      class="
        bg-white
        container
        mx-auto
        p-10
        max-w-xs
        rounded-lg
        overflow-hidden
        shadow
        flex flex-col
      "
    >
      <div><h1>会員登録</h1></div>
      <div>
        <label for="email">メール</label
        ><input
          type="text"
          v-model="userImfo.email"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        <label for="password">パスワード</label
        ><input
          type="text"
          v-model="userImfo.password"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        <label for="name">名前</label
        ><input
          type="text"
          v-model="userImfo.name"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        <label for="tel">電話番号</label
        ><input
          type="text"
          v-model="userImfo.tel"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        <label for="postalcode">郵便番号</label
        ><input
          type="text"
          v-model="userImfo.postalcode"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>

      <div>
        <label for="address">住所</label
        ><input
          type="text"
          v-model="userImfo.address"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        />
      </div>
      <div>
        <button
          @click="signup"
          class="
            text-white
            font-semibold
            bg-green-500
            py-2
            px-4
            rounded-lg
            shadow-md
            transition
            duration-200
            transform-gpu
            hover:scale-105
          "
        >
          登録
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { userImfoType } from '../types/userImfoType';
type DataType = {
  userImfo: userImfoType;
};

export default Vue.extend({
  data(): DataType {
    return {
      userImfo: {
        email: '',
        password: '',
        name: '',
        tel: '',
        postalcode: '',
        address: '',
      },
    };
  },
  methods: {
    signup() {
      console.log(this.userImfo);
    },
  },
});
</script>
