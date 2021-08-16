<template>
    <div>
        <h2>cart / orderInfo.vue</h2>
        <div>
            <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    名前
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="田中太郎">
                <!-- <p class="text-red-500 text-xs italic"></p> -->
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    メールアドレス
                </label>
                <validation-provider name="email" rules="required|email">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-mail" type="text" placeholder="sample@gmail.com">
                </validation-provider>
                </div>
            </div>
            <div class="flex flex-wrap items-end -mx-3 mb-6">
                <div class="w-full md:w-1/4 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    郵便番号
                </label>
                    <input class="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-ad-number" type="text" placeholder="1230000">
                </div>
                <div class="w-full md:w-1/4 px-3">
                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-4 border-blue-700 hover:border-blue-500 rounded">検索</button>
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    住所
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="東京都新宿区マルマルモリモリ">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    電話番号
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="XXX-XXXX-XXXX">
                <!-- <p class="text-red-500 text-xs italic"></p> -->
                </div>
                <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    配達日
                </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="date" placeholder="">
                </div>
                <div class="w-full md:w-1/3 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    配達時間
                </label>
                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>10~12時</option>
                    <option>13~15時</option>
                    <option>16~19時</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-wrap items-end -mx-3 mb-2">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div>
                <label>
                    <input type="radio" name="pay" value="1" @click="notcreditPay()">代金引換
                </label>
                </div>
                <div>
                <label>
                    <input type="radio" name="pay" value="2" @click="creditPay()">クレジットカード
                </label>
                </div>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" v-if="this.pay==true">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    クレジット番号
                </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="">
                </div>
            </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
// import Vue from 'vue';
// import VeeValidate from 'vee-validate';
// Vue.use(VeeValidate);

import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
// import { Field } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
extend('email', email);
extend('required', {
  ...required,
  message: '{_field_}は必須項目です。'
});

export default Vue.extend({
    data(){
        return {pay:false}
    },
    components: {
        // Field,
    ValidationProvider,
    ValidationObserver,
    },
    methods:{
        creditPay(){
            this.pay=true
            console.log('creditpay 発動！')
        },
        notcreditPay(){
            this.pay=false
        }

    }
})
</script>