<template>
  <div class="sm:pl-10 p-1 flex">
    <div>
      <div class="mb-5"><h1 class="block ml-2 text-4xl">商品詳細</h1></div>
      <div class="sm:flex">
        <div class="m-2">
          <img :src="itemDetail.img" class="rounded-xl w-full" />
        </div>
        <div
          class="
            flex flex-col
            justify-center
            sm:m-5
            bg-white
            p-3
            sm:p-5
            rounded-xl
          "
        >
          <div>
            <p class="text-gray-700 text-2xl sm:text-4xl font-bold">
              {{ itemDetail.name }}
            </p>
          </div>
          <div class="mt-5">
            <p>
              <span class="text-xl sm:text-3xl">￥{{ itemDetail.price }}</span>
              税込
            </p>
          </div>
          <div>
            <p class="block my-2 sm:my-4 sm:text-xl">
              {{ itemDetail.description }}
            </p>
          </div>

          <div class="flex">
            <div class="flex items-center">
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
                    focus:ring-base_orange
                    focus:border-base_orange
                    text-base
                    pl-3
                    pr-10
                  "
                  v-model="selectedItemNum"
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
                    text-center text-gray-600
                    pointer-events-none
                    flex
                    w-4
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
        </div>
      </div>

      <div class="sm:mt-5 mt-2 bg-white p-3 rounded-xl">
        <p class="mb-3 pl-2 text-xl">
          トッピング<span class="font-bold"> 少:200円 多:300円</span>
        </p>
        <div class="flex flex-wrap">
          <div
            class="sm:w-1/5 w-1/2 p-2 text-center font-bold"
            v-for="(topping, index) in getToppings"
            :key="topping.id"
          >
            <div class="bg-base_cream bg-opacity-60 rounded p-1">
              <p>{{ topping.name }}</p>
              <input
                type="radio"
                :name="'radio' + index"
                class="
                  hover:bg-gray-400
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  bg-white
                "
                @change="
                  selectToppingSize(
                    topping.name,
                    topping.id,
                    topping.priceM,
                    1,
                    topping.isActiveM
                  )
                "
              />
              <span class="font-normal text-sm">少</span>
              <input
                type="radio"
                :name="'radio' + index"
                class="
                  sm:ml-2
                  hover:bg-gray-400
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  bg-white
                "
                @change="
                  selectToppingSize(
                    topping.name,
                    topping.id,
                    topping.priceL,
                    2,
                    topping.isActiveL
                  )
                "
              />
              <span class="font-normal text-sm">多</span>
              <input
                type="radio"
                :checked="true"
                :name="'radio' + index"
                class="
                  sm:ml-2
                  text-gray-700
                  font-semibold
                  hover:text-white
                  text-sm
                  border border-gray-400
                  sm:w-4
                  w-3
                  hover:border-transparent
                  rounded
                  checked:bg-red-600
                "
                @change="
                  selectToppingSize(topping.name, topping.id, 0, 0),
                    clearTopping(topping.id)
                "
              />
              <span class="font-normal text-sm">なし</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end mt-5">
        <div class="px-4 sm:py-3 py-1 sm:px-4">
          <p class="text-gray-700 sm:text-4xl text-xl">
            合計
            <span class="font-bold sm:text-4xl text-2xl"
              >￥{{ calcTotalPrice }}</span
            >
          </p>
        </div>
        <div class="py-1 px-6 sm:py-2 sm:px-8">
          <button
            class="
              text-white
              font-semibold
              bg-base_red
              sm:py-3 sm:px-4
              py-1
              px-4
              rounded
              transition
              duration-200
              transform-gpu
              hover:scale-105
              text-xm
            "
            @click="addCart"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ItemsStore, ToppingsStore, CartStore, UserStore } from '../../store';
import { itemType } from '~/types/itemType';
import { toppingType } from '~/types/toppingType';
import { cartItemType } from '~/types/cartItemType';

type DataType = {
  isSelectedM: null | number;
  isSelectedL: null | number;
  itemDetail: itemType | undefined;
  itemNum: number[];
  selectedItemNum: number;
  allToppingPrice: number;
  selectedTopping: toppingType[];
};

export default Vue.extend({
  head() {
    return {
      title: '商品詳細',
    };
  },
  data(): DataType {
    return {
      isSelectedM: null,
      isSelectedL: null,
      itemDetail: {},
      itemNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedItemNum: 1,
      allToppingPrice: 0,
      selectedTopping: [],
    };
  },
  created(): void {
    const params: number = Number(this.$route.params.itemId);
    const getItemDetail: itemType | undefined =
      ItemsStore.getItemDetail(params);
    this.itemDetail = getItemDetail;
  },
  methods: {
    // トッピング追加----------------------------------------------------
    selectToppingSize(
      selectedName: string,
      selecteId: number,
      toppingPrice: number,
      toppingSize: number
    ): void {
      // 同じトッピングを選択していないかチェック
      const duplicatedTopping = this.selectedTopping.findIndex(
        (topping) => topping.id === selecteId
      );
      // toppingの重複が無いとき
      if (duplicatedTopping < 0) {
        const pushTopping: toppingType = {
          name: selectedName,
          id: selecteId,
          price: toppingPrice,
          size: toppingSize,
        };
        this.selectedTopping.push(pushTopping);
      }
      // 同じtoppingを選んだとき
      else if (duplicatedTopping >= 0) {
        // サイズを変更したとき
        if (this.selectedTopping[duplicatedTopping].size !== toppingSize) {
          this.selectedTopping[duplicatedTopping].size = toppingSize;
          this.selectedTopping[duplicatedTopping].price = toppingPrice;
        } // 取り消したいとき(同じトッピング・サイズを選んだとき)
        else {
          this.selectedTopping[duplicatedTopping].size = 0;
          this.selectedTopping = this.selectedTopping.filter(
            (topping) => topping.size !== 0
          );
        }
      }
      // topping価格の更新
      this.allToppingPrice = this.selectedTopping.reduce(
        (sum: number, addTopping: any) => sum + addTopping.price,
        0
      );
    },

    //トッピングを未選択に戻す
    clearTopping(selecteId: number): void {
      const deleteToppigIndex = this.selectedTopping.findIndex(
        (topping) => topping.id === selecteId
      );
      this.selectedTopping.splice(deleteToppigIndex, 1);
    },

    // カートに追加-------------------------------------------------------------------
    async addCart(): Promise<void> {
      if (!UserStore.userInfo) {
        this.$router.push('/signin');
      } else {
        const addItemToCart: cartItemType = {
          itemId: this.itemDetail?.id,
          itemName: this.itemDetail?.name,
          itemPrice: this.itemDetail?.price,
          itemNum: this.selectedItemNum,
          itemImg: this.itemDetail?.img,
          toppings: this.selectedTopping,
          allToppingPrice: this.allToppingPrice,
          totalPrice: this.calcTotalPrice,
        };
        if (confirm('カートに商品を追加しますか？')) {
          CartStore.addItemToCartAct(addItemToCart);
          await this.$router.push('/Cart');
        }
      }
    },
  },
  computed: {
    // getCart(): cartItemType[] {
    //   return CartStore.getCart;
    // },
    getToppings(): toppingType[] {
      return ToppingsStore.getToppings;
    },
    calcTotalPrice(): number {
      if (
        this.itemDetail === undefined ||
        this.itemDetail.price === undefined
      ) {
        return 0;
      } // 0はfalse
      return (
        this.selectedItemNum * this.itemDetail.price + this.allToppingPrice
      );
    },
  },
});
</script>
