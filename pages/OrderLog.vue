<template>
  <div>
    <div v-if="logItems.length === 0">履歴はありません</div>
    <div class="grid justify-items-center" v-if="logItems.length > 0">
      <!-- <h1>カート(Cart.vue)</h1> -->
      <div class="p-8">
        <table class="table-auto shadow-xl">
          <thead class="bg-yellow-800 bg-opacity-25">
            <tr>
              <th class="w-1/6"></th>
              <th class="w-1/6">商品</th>
              <th class="w-1/6">トッピング</th>
              <th class="w-1/6">配送情報</th>
              <th class="w-1/6">計(税抜)</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="logItem in logItems[0].itemInfo"
              :key="logItem.specialId"
              class="
                shadow-inner
                text-center
                hover:bg-green-500 hover:bg-opacity-25 hover:shadow
              "
            >
              <td class="w-1/6 shadow-md"><img :src="logItem.itemImg" /></td>
              <td class="w-1/6">
                <p class="font-bold">{{ logItem.itemName }}</p>
                <p>×{{ logItem.itemNum }}</p>
              </td>
              <td>
                <div v-if="logItem.toppings.length > 0">
                  <div v-for="topping in logItem.toppings" :key="topping.id">
                    {{ topping.name }}
                  </div>
                </div>
                <div v-else>トッピングなし</div>
              </td>
              <td>配送情報</td>
              <td class="w-1/6">{{ logItem.totalPrice }} 円</td>
              <td>
                <button
                  class="
                    text-white
                    font-semibold
                    bg-green-500
                    py-2
                    px-4
                    rounded
                    transition
                    duration-200
                    transform-gpu
                    hover:scale-105
                  "
                  @click="cancelOrder(logItem)"
                >
                  注文キャンセル
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {{logItems}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { UserStore } from '../store';
import { db } from '~/plugins/firebase';
import { cartItemType } from '~/types/cartItemType';

type DataType = {
  logItems: cartItemType[];
};
export default Vue.extend({
  data(): DataType {
    return {
      logItems: [],
    };
  },
  //   created() {
  //     console.log('asyncフェッチ/OrdersLog.vue');
  //      OrderlogStore.fetchLogItemsAct();
  //     // await this.$set( OrderlogStore.getOrderLogItem)
  //   },

  async fetch() {
    if (!UserStore.userInfo) {
      console.log('ログインしていません');
    } else {
      if (!UserStore.userInfo.uid) return;
      let uid: string | undefined | null;
      uid = UserStore.userInfo.uid;
      await db
        .collection(`users/${uid}/order`)
        .get()
        .then((orders) => {
          orders.forEach((order) => {
            if (order.data().status === 1 || order.data().status === 2) {
              // ifDBの履歴情報(orderId)がstateのorederLogの情報と重複していなかったら下記を実行
              this.logItems.push(order.data());
            }
          });
        });
    }
  },
  methods: {
    cancelOrder(logItem:cartItemType): void {
      console.log('注文キャンセル'+JSON.stringify(logItem));
      //クリックしたdata()内のorderのuidをdbで検索し、一致したもののstatusを9にする
    },
  },

  //   computed: {
  //     // ログインユーザを換えても前回のユーザの履歴のまま更新されない
  //     //オブジェクトそのものの変化が無ければ、computedはキャッシュした値を返してしまう
  //     //cacheをfalseにすることで、毎度値を更新する
  //     getOrderLogItem: {
  //       cache: false,
  //       get() {
  //         return OrderlogStore.getOrderLogItem;
  //       },
  //     },
  //   },
});
</script>
