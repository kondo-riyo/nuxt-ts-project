<template>
  <div>
    <div
      type="text"
      class="
        bg-white
        container
        mx-auto
        p-10
        m-10
        max-w-xs
        rounded-lg
        overflow-hidden
        shadow
        flex flex-col
      "
    >
      <div>
        <h1 class="font-bold text-xl text-gray-700 text-center">ログイン</h1>
      </div>
      <ValidationObserver v-slot="{ invalid }">
        <div>
          <label for="email">メール</label>
          <!-- <input
          type="text"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        /> -->
          <validation-provider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email"
          >
            <input
              v-model="userInfo.email"
              name="メールアドレス"
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              type="text"
            />
            <span class="text-xs text-red-700">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
        <div>
          <label for="password">パスワード</label>
          <!-- <input
          type="text"
          v-model="userInfo.password"
          class="w-3/6 m-1 rounded-md border border-gray-300 focus:outline-none"
        /> -->
          <validation-provider
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <input
              v-model="userInfo.password"
              class="
                appearance-none
                block
                w-full
                bg-gray-200
                text-gray-700
                border border-gray-200
                rounded
                py-3
                px-4
                leading-tight
                focus:outline-none focus:bg-white focus:border-gray-500
              "
              type="password"
              placeholder="*******"
            />
            <span class="text-xs text-red-700">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
        <div class="block ml-16 m-4 self-center">
          <button
            @click="login"
            :disabled="invalid"
            class="
              bg-base_red
              hover:bg-base_orange
              text-white
              font-bold
              py-2
              px-6
              rounded-full
            "
          >
            ログイン
          </button>
        </div>
      </ValidationObserver>
      <div class="self-center">
        <nuxt-link to="/signup" class="text-blue-700">
          新規会員登録はこちら
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { userLoginType } from '../types/userInfoType';
import { UserStore } from '../store';
import { auth } from '../plugins/firebase';

type DataType = {
  userInfo: userLoginType;
};

export default Vue.extend({
  middleware: 'authenticated',
  data(): DataType {
    return {
      userInfo: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    login(): void {
      if (typeof this.userInfo !== undefined) {
        console.log(typeof this.userInfo);
        auth
          .signInWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          )
          .then((authUser) => {
            console.log(authUser.user);
            if (
              authUser.user === null ||
              authUser.user.email === null ||
              authUser.user.uid === null
            )
              return;
            UserStore.loginAct(authUser.user.email, authUser.user.uid).then(
              () => this.$router.push('/')
            );
          });
      } else {
        console.log('undefined');
      }
    },
  },
});
</script>
