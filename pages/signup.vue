<template>
  <div class="">
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
      <div><h1 class="font-bold text-xl text-gray-700 text-center">会員登録</h1></div>
      <ValidationObserver v-slot="{ invalid }">
      <div>
        <label for="name">名前</label>
        <validation-provider
          v-slot="{ errors }"
          name="名前"
          rules="required|max:10"
        >
        <input
          v-model="userInfo.name"
          name="名前"
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
          placeholder="例)田中 太朗"
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div>
      <div>
        <label for="email">メール</label>
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
          placeholder="例)sample@gmail.com"
          />
        <span class="text-xs text-red-700">
          {{ errors[0] }}
        </span>
        </validation-provider>
      </div>
      <div>
        <label for="tel">電話番号</label>
        <validation-provider
         v-slot="{ errors }"
         name="電話番号"
         rules="required|min:10|max:11"
        >
        <input
          v-model="userInfo.tel"
          name="電話番号"
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
          placeholder="例)090XXXXXXXX"
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div>
      <div>
        <label for="postalcode">郵便番号</label>
        <validation-provider
          v-slot="{ errors }"
          name="郵便番号"
          rules="required|yubin"
        >
        <input
          v-model="userInfo.postalcode"
          name="郵便番号"
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
          placeholder=""
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div>

      <div>
        <label for="address">住所</label>
        <validation-provider
          v-slot="{ errors }"
          name="住所"
          rules="required"
        >
        <input
          v-model="userInfo.address"
          name="住所"
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
          placeholder="東京都新宿区"
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div>
      <div>
        <label for="password">パスワード(登録)</label>
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
          placeholder="例)*******"
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div>
      <!-- <div>
        <label for="password">パスワード(確認)</label>
        <validation-provider
            v-slot="{ errors }"
            name="パスワードの確認"
            rules="required"
            vid="confirmation"
        >
        <input
          name="パスワードの確認"
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
          placeholder="例)*******"
          />
          <span class="text-xs text-red-700">
            {{ errors[0] }}
          </span>
          </validation-provider>
      </div> -->
      <div class="my-4 ml-16 self-center">
        <button
          @click="signup"
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
          登録
        </button>
      </div>
     </ValidationObserver>
      <div class="self-center">
        <nuxt-link to="/signin" class="text-blue-700">
          会員登録済みの方はこちら
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import firebase, { auth, db } from '../plugins/firebase';
import { userInfoType } from '../types/userInfoType';
type DataType = {
  userInfo: userInfoType;
};
export default Vue.extend({
  data(): DataType {
    return {
      userInfo: {
        email: '',
        password: '',
        name: '',
        tel: '',
        postalcode: '',
        address: '',
        uid: '',
      },
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async signup(): Promise<void> {
      try {
        // メールとパスワードで会員登録
        if (
          this.userInfo.email === undefined ||
          this.userInfo.password === undefined
        )
          return;
        const authUser: firebase.auth.UserCredential =
          await auth.createUserWithEmailAndPassword(
            this.userInfo.email,
            this.userInfo.password
          );
        // dbに会員情報を保存
        if (authUser.user === null) return;
        await this.addAuthUserToDb(authUser.user.uid);
        //会員登録後、ログイン画面に遷移
        this.$router.push('/signin');
      } catch (error) {
        console.log(error.message + 'サインインエラー');
      }
    },
    addAuthUserToDb(
      uid: string
    ): Promise<
      firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    > {
      return db.collection(`users/${uid}/userInfo`).add({
        email: this.userInfo.email,
        name: this.userInfo.name,
        tel: this.userInfo.tel,
        postalcode: this.userInfo.postalcode,
        address: this.userInfo.address,
        uid: uid,
      });
    },
  },
});
</script>
