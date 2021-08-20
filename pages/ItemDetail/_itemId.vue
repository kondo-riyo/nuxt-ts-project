<template>
  <div>
    <div class="bg-transparent p-5 flex">
      <img :src="itemDetail.img" class="m-2 rounded-xl" />
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

        <div class="flex">
          <div class="flex ml-6 items-center m-1">
            <span class="mr-3">
              <font style="vertical-align: inherit">
                <font style="vertical-align: inherit">個数</font>
              </font>
            </span>
            <div class="relative">
              <select
                class="
                  rounded
                  border
                  appearance-none
                  border-gray-300
                  py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
                  focus:border-green-500
                  text-base
                  pl-3
                  pr-10
                "
              >
                <option v-for="(num, index) in itemNum" :key="index">
                  {{ num }}
                </option>
              </select>
              <span
                class="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-10
                  text-center text-gray-600
                  pointer-events-none
                  flex
                  items-center
                  justify-center
                "
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
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
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore } from '../../store';
import { itemType } from '~/types/itemType';
import { toppingType } from '~/types/toppingType';

type DataType = {
  itemDetail: itemType | undefined;
  itemNum: number[];
};

export default Vue.extend({
  data(): DataType {
    return {
      itemDetail: {},
      itemNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  async created() {
    const params: number = await Number(this.$route.params.itemId);
    const itemDetail = await ItemsStore.getItemDetail(params);
    this.itemDetail = itemDetail;
  },

  computed: {
    getToppings(): toppingType[] {
      return ToppingsStore.getToppings;
    },
  },
  // async asyncData({ params }) {
  //   console.log(" ASYNCデータ");
  //   const detailParamsId: number = Number(params.itemId);
  //   const detailItemFromStore = await ItemsStore.getItemDetail(detailParamsId);
  //   return {itemDetail:detailItemFromStore}
  // },
});
</script>
