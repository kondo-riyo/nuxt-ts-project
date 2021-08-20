<template>
    <div class="grid justify-items-center">
        <h1>カート(Cart.vue)</h1>
        <button @click="OrderMove()">注文に進む</button>
        <!-- <div v-show="this.order=true"><CartOrderInfo/></div> -->
        <client-only>
        <CartOrderInfo v-show="this.order==true"/>
        </client-only>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return {order:false}
    },
    methods:{
        OrderMove(){
            this.order=true
            console.log('move')
        }
    }
})
</script>