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
      <div><h1>ログイン</h1></div>
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
        <button
        @click="signin"
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
          ログイン
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { userLoginType } from '../types/userImfoType';
type DataType = {
  userImfo: userLoginType,
};

export default Vue.extend({
  data() :DataType{
    return {
      userImfo: {
        email: '',
        password: '',
      },
    };
  },
  methods:{
    signin(){
      console.log(this.userImfo)
    }
  }
});
</script>
