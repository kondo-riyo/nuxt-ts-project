<template>
  <div>
  <CartTable :cartItemFromStore="cartItemFromStore[0]" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { CartStore} from '../store';
import {  orderItemType } from '../types/cartItemType';

type headType = {
  title: string;
};
type DataType = {
  cartItemFromStore: orderItemType[],
};

export default Vue.extend({
  head(): headType {
    return {
      title: 'カート',
    };
  },
  data(): DataType {
    return { cartItemFromStore: CartStore.getitemInfo };
  },
});
</script>
