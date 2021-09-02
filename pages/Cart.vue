<template>
  <div>
    <div
      v-if="cartItem.itemInfo.length===0"
      class="grid justify-items-center p-20"
    >
      <div class="text-red-400 font-bold text-2xl">
        現在カートに商品はありません
      </div>
      <button
        class="
          bg-green-500
          hover:bg-green-700
          text-white
          font-bold
          py-2
          px-4
          rounded-full
          m-10
        "
      >
        <router-link to="/">商品を選ぶ</router-link>
      </button>
    </div>
    <div
      v-if="cartItem.itemInfo.length>0"
      class="grid justify-items-center"
    >
      <div class="p-10">
        <table class="table-auto shadow-xl">
          <thead class="bg-base_red">
            <tr class="text-center text-base_cream">
              <th class="w-2/12"></th>
              <th class="w-3/12">商品名</th>
              <th class="w-2/12">価格(税抜)</th>
              <th class="w-1/12">個数</th>
              <th class="w-2/12">計(税抜)</th>
              <th class="w-2/12"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="cartitem in cartItem.itemInfo"
              :key="cartitem.specialId"
              class="
                shadow-inner
                text-center
                hover:bg-base_green hover:bg-opacity-25 hover:shadow
                space-y-6
              "
            >
              <td class="shadow-md">
                <p><img :src="cartitem.itemImg" /></p>
              </td>
              <td class="">
                <div class="text-xl font-bold">
                  {{ cartitem.itemName }}
                </div>
                <div
                  v-for="topping in cartitem.toppings"
                  :key="topping.id"
                  class="text-sm"
                >
                  {{ topping.name }} ({{ toppingSize(topping.size) }})
                </div>
              </td>
              <td class="">
                <div class="">{{ cartitem.itemPrice }} 円</div>
                <div
                  v-for="topping in cartitem.toppings"
                  :key="topping.id"
                  class="text-sm"
                >
                  + {{ topping.price }} 円
                </div>
              </td>
              <td class="">{{ cartitem.itemNum }} 個</td>
              <td class="text-xl font-bold">{{ cartitem.totalPrice }} 円</td>
              <td class="">
                <button
                  title="商品を削除"
                  @click="deleteCartItem(cartitem.specialId)"
                  class="w-2/6"
                >
                  <img src="~/assets/img/trash.png" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          class="
            bg-base_red
            hover:bg-base_orange
            text-white
            font-bold
            py-2
            px-4
            rounded-full
          "
        >
          <router-link to="/OrderInfo"> 注文に進む </router-link>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { itemInfoStore, UserStore } from '../store';
import { cartItemType } from '../types/cartItemType';
import { db } from '~/plugins/firebase';

type DataType = {
  getItemInfoFromState: cartItemType[];
};

export default Vue.extend({
  data(): DataType {
    return {
      getItemInfoFromState: [],
    };
  },
  methods: {
    toppingSize(el: number) {
      if (el === 1) {
        return '多';
      } else if (el === 2) {
        return '少';
      }
    },
    deleteCartItem(id: string) {
      if (confirm('カートから商品を削除しますか？')) {
        itemInfoStore.deleteCartItemAct(id);
        this.$router.push("/")
      }
    },
  },
  async asyncData() {
    let cartItems: any = {itemInfo:[]};
    await db
      .collection(`users/${UserStore.userInfo!.uid}/order`)
      .get()
      .then((itemInfoAll) => {
        if (itemInfoAll.docs.length > itemInfoStore.itemInfo.length) {
          itemInfoAll.forEach((itemInfo) => {
            let itemInfoFromDb: cartItemType = itemInfo.data();
            if (itemInfoFromDb.status === 0) {
              itemInfoFromDb = { ...itemInfoFromDb, orderId: itemInfo.id };
              cartItems=itemInfoFromDb;
            } 
          });
        }
      });
    return { cartItem: cartItems };
  },
});
</script>
