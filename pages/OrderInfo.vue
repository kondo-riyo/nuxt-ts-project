<template>
  <div class="flex justify-center items-center">
    <div class="bg-white sm:w-3/4  m-3 p-8 rounded">
    <div class="flex m-10 font-bold sm:text-3xl text-xl text-base_red justify-center">
      <p><img src="~/assets/img/coffeebeans_icon.png" class="sm:m-2 m-1 w-6"/></p>
      <p>お届け先情報</p>
      <p><img src="~/assets/img/coffeebeans_icon.png" class="sm:m-2 m-1 w-6"/></p>
    </div>

    <div class="flex justify-center items-center">
      <div>
        <div class="p-3">
          <form
            @submit.prevent
            class="
              grid
              justify-items-center
              w-full
              max-w-lg
              mt-0
              mb-0
              mr-auto
              ml-auto
            "
          >
            <ValidationObserver v-slot="{ invalid }">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-first-name"
                  >
                    名前
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="名前"
                    rules="required|max:10"
                  >
                    <input
                      v-model="name"
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
                      id="grid-name"
                      type="text"
                      placeholder="例)田中太郎"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-last-name"
                  >
                    メールアドレス
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="メールアドレス"
                    rules="required|email"
                  >
                    <input
                      v-model="email"
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
                      id="grid-mail"
                      type="text"
                      placeholder="例)sample@gmail.com"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="flex flex-wrap items-start -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-last-name"
                  >
                    郵便番号
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="郵便番号"
                    rules="required|yubin"
                  >
                    <input
                      v-model="postalcode"
                      name="zip1"
                      class="
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
                      id="grid-ad-number"
                      type="text"
                      placeholder="例)1234567"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
                <div class="w-full md:w-2/3 px-3">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-last-name"
                  >
                    住所
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="住所"
                    rules="required"
                  >
                    <input
                      v-model="address"
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
                      iid="address"
                      type="text"
                      placeholder="例)東京都新宿区〇〇"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-4/12 px-3 mb-6 md:mb-0">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-first-name"
                  >
                    電話番号
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="電話番号"
                    rules="required|min:10|max:11"
                  >
                    <input
                      v-model="tel"
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
                      id="grid-name"
                      type="text"
                      placeholder="例)00000000000"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
                <div class="w-2/3 md:w-5/12 px-3">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-last-name"
                  >
                    配達日
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="配達日"
                    rules="required"
                  >
                    <input
                      v-model="deliveryDate"
                      name="配達日"
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
                      id="grid-name"
                      type="date"
                      placeholder=""
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
                <div class="w-1/3 md:w-3/12 px-3">
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-base_green text-xs
                      font-bold
                      my-2
                      ml-4
                    "
                    for="grid-last-name"
                  >
                    配達時間
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="配達時間"
                    rules="required|delivary_validation:@配達日"
                  >
                    <select
                      v-model="deliveryTime"
                      name="配達時間"
                      class="
                        block
                        appearance-none
                        w-full
                        bg-gray-200
                        border border-gray-200
                        text-gray-700
                        py-3
                        px-4
                        pr-8
                        rounded
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                      "
                      id="grid-state"
                    >
                      <option value="10">10時</option>
                      <option value="11">11時</option>
                      <option value="12">12時</option>
                      <option value="13">13時</option>
                      <option value="14">14時</option>
                      <option value="15">15時</option>
                      <option value="16">16時</option>
                      <option value="17">17時</option>
                    </select>
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="flex flex-wrap items-start -mx-3 mb-2">
                <div class="w-full md:w-1/2 pt-6 px-3 mb-6 md:mb-0">
                  <validation-provider
                    v-slot="{ errors }"
                    name="pay"
                    rules="oneOf:1,2"
                  >
                  <div>
                    <label
                    class="
                      tracking-wide
                      text-gray-500
                      font-bold
                      mb-2
                    "
                    >
                      <input
                        v-model="payment"
                        type="radio"
                        name="代引き"
                        value="1"
                        @click="notcreditPay()"
                      />代金引換
                    </label>
                  </div>
                  <div>
                    <label
                    class="
                      tracking-wide
                      text-gray-500
                      font-bold
                      mb-2
                    "
                    >
                      <input
                        v-model="payment"
                        type="radio"
                        name="クレジットカード払い"
                        value="2"
                        @click="creditPay()"
                      />クレジットカード
                    </label>
                  </div>
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
                <div
                  class="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                  v-if="selectPayment == true"
                >
                  <label
                    class="
                      block
                      uppercase
                      tracking-wide
                      text-gray-700 text-xs
                      font-bold
                      mb-2
                    "
                    for="grid-last-name"
                  >
                    クレジットカード番号
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    name="クレジットカード番号"
                    rules="required|creditNum"
                  >
                    <input
                      v-model="creditCardNum"
                      name="クレジットカード番号"
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
                      id="grid-name"
                      type="text"
                      placeholder="例)0000000000000000"
                    />
                    <span class="text-xs text-red-700">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="flex flex-wrap justify-center items-start -mx-3 mb-2">
                <div v-if="invalid" class="font-semibold text-base_red bg-base_cream py-3 px-4 mt-5 rounded-full">
                  ※入力内容が不足しています
                </div>
                <button
                  @click="OrderSubmit()"
                  :disabled="invalid"
                  v-if="!invalid"
                  class="
                    bg-base_red
                    hover:bg-base_red hover:bg-opacity-50 hover:text-black
                    text-white
                    font-semibold
                    py-3
                    px-4
                    rounded
                    mt-5
                  "
                >
                  ご注文を確定する
                </button>
              </div>
            </ValidationObserver>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { UserStore, CartStore } from '../store';
import {
  orderInfoType,
  orderItemType,
} from '../types/cartItemType';
import { userInfoType } from '../types/userInfoType';

export default Vue.extend({
  data(): orderInfoType {
    return {
      name: UserStore.getUserInfo!.name,
      email: UserStore.getUserInfo!.email,
      postalcode: UserStore.getUserInfo!.postalcode,
      address: UserStore.getUserInfo!.address,
      tel: UserStore.getUserInfo!.tel,
      deliveryDate: '',
      deliveryTime: '',
      payment: 0,
      creditCardNum: '',
      selectPayment: false,
    };
  },
  components: {
    // Field,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    OrderSubmit():void {
      // cartの商品のstatusを1又は２に変更。
      let orderInfo = {
        name: this.name,
        email: this.email,
        postalcode: this.postalcode,
        address: this.address,
        tel: this.tel,
        deliveryDate: this.deliveryDate,
        deliveryTime: this.deliveryTime,
        payment: Number(this.payment),
        creditCardNum: this.creditCardNum,
        selectPayment: this.selectPayment,
        allPrice:this.getAllPrice,
      };
      let orderInfoToDb: any;
      orderInfoToDb = { ...this.itemInfoFromStore[0], orderInfo: orderInfo };
      if(confirm('注文を確定してもよろしいですか？')){
      CartStore.updateOrderAct(orderInfoToDb);
      this.$router.push('/OrderComp')
      }
    },
    creditPay():void {
      this.selectPayment = true;
    },
    notcreditPay():void {
      this.selectPayment = false;
    },
  },
  // async fetch():Promise<void> {
  //   const fetchitemInfoFromStore = CartStore.fetchitemInfoAct();
  //   await Promise.all([fetchitemInfoFromStore]);
  // },

  //async fetchでcartの商品を取得する(cartStore)
  computed: {
    userInfoFromStore(): userInfoType | null {
      return UserStore.getUserInfo;
    },
    itemInfoFromStore(): orderItemType[] {
      return CartStore.getitemInfo;
    },
    getAllPrice():number{
      let allPrice:number = 0;
      //@ts-ignore
      CartStore.getitemInfo[0].itemInfo!.forEach(item=>{
       allPrice = allPrice + item.totalPrice!
      })
      return allPrice;
    }
  },
  head(){
    return {
      title: 'お届け先情報入力'
    }
  }
});
</script>
