<template>
  <div>
    <div class="grid justify-items-center">
      <div class="p-8">
        <table class="table-auto shadow-xl">
          <thead class="bg-yellow-800 bg-opacity-25">
            <tr>
              <th class="w-1/6"></th>
              <th class="w-1/6">商品名</th>
              <th class="w-1/6">価格(税抜)</th>
              <th class="w-1/6">個数</th>
              <th class="w-1/6">計(税抜)</th>
              <th class="w-1/6"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="cartitem in carts"
              :key="cartitem.id"
              class="
                shadow-inner
                text-center
                hover:bg-green-500 hover:bg-opacity-25 hover:shadow
              "
            >
              <td class="w-1/6 shadow-md"><img :src="cartitem.img" /></td>
              <td class="w-1/6">{{ cartitem.name }}</td>
              <td class="w-1/6">{{ cartitem.price }} 円</td>
              <td class="w-1/6">{{ cartitem.itemNum }} 個</td>
              <td class="w-1/6">{{ cartitem.price * cartitem.itemNum }} 円</td>
              <td class="w-1/6">
                <img src="~/assets/img/trash.png" class="w-1/3" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          @click="OrderMove()"
          class="
            bg-green-500
            hover:bg-green-700
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
      <div class="p-3 shadow-xl"></div>
      <div>{{ order }}</div>
    </div>
    <!-- <div v-show="this.order=true"><CartOrderInfo/></div> -->
    <div class="p-3 shadow-xl">
      <client-only>
        <!-- <CartOrderInfo v-show="this.order==true"/> -->
      </client-only>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { itemInfoStore } from '../store';

interface itemInfoType {
  id?: string;
  itemId?: number;
  itemNum?: string;
}

export default Vue.extend({
  data() {
    return {
      order: itemInfoStore.itemInfo,
      carts: [
        {
          name: 'コーヒー',
          price: 500,
          img: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111',
          id: 15,
          itemNum: 2,
        },
        {
          name: 'コーヒー',
          price: 500,
          img: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111',
          id: 14,
          itemNum: 2,
        },
        {
          name: 'コーヒー',
          price: 500,
          img: 'https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111',
          id: 13,
          itemNum: 2,
        },
      ],
    };
  },
  methods: {
    OrderMove() {
      console.log('move');
      console.log(itemInfoStore.getitemInfo);
    },
  },
  computed: {
    itemInfoFromStore(): itemInfoType[] {
      return itemInfoStore.getitemInfo;
    },
  },
  async fetch() {
    if (itemInfoStore.itemInfo.length === 0) {
      const fetchitemInfoFromStore = itemInfoStore.fetchitemInfoAct();
      await Promise.all([fetchitemInfoFromStore]);
    }
  },
});
</script>
