<template>
  <div>
    <div class="bg-transparent p-5 flex">
      <img :src="itemDetail.img" alt="" class="m-2" />
      <div>
        <div class="m-2">
          <p class="text-gray-700 text-4xl">{{ itemDetail.name }}</p>
          <p>
            <span class="text-2xl">￥{{ itemDetail.price }}</span
            >税込
          </p>
          <p class="block my-4">{{ itemDetail.description }}</p>
        </div>
        <div class="flex flex-wrap">
          <div
            class="w-1/3 mb-1"
            v-for="topping in getToppings"
            :key="topping.id"
          >
            <input type="checkbox" class="m-1" />{{ topping.name }}
          </div>
        </div>
        <button
          class="
            text-white
            font-semibold
            bg-green-500
            py-2
            px-4
            shadow-md
            transition
            duration-200
            transform-gpu
            hover:scale-105
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore } from '../store';
import { itemType } from '~/types/itemType';

type DataType = {
  itemDetail: itemType | undefined;
};

export default Vue.extend({
  data(): DataType {
    return {
      itemDetail: {},
    };
  },
  created() {
    const params: number = Number(this.$route.params.itemid);
    const itemDetail = ItemsStore.getItemDetail(params);
    this.itemDetail = itemDetail;
  },
  computed: {
    getItemDetail() {
      return ItemsStore.getItemDetail;
    },
    getToppings() {
      return ToppingsStore.getToppings;
    },
  },
  // async asyncData({params}){
  //     console.log(params)
  //     const detailParamsId:number = Number(params)
  //     const detailItemFromStore = await ItemsStore.getItemDetail(detailParamsId);
  //     // await this.itemDetail=detailItemFromStore;
  //     console.log(detailItemFromStore)
  //     return {detailItemFromStore}
  // },
});
</script>
