<template>
    <div class="grid justify-items-center">
        <!-- <h1>カート(Cart.vue)</h1> -->
        <div class="p-8 ">
            <table  class="table-auto shadow-xl">
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
                    <tr v-for="cartitem in carts" :key="cartitem.id" class="shadow-inner text-center hover:bg-green-500 hover:bg-opacity-25 hover:shadow">
                        <td class="w-1/6 shadow-md "><img :src="cartitem.img" /></td>
                        <td class="w-1/6">{{cartitem.name}}</td>
                        <td class="w-1/6">{{cartitem.price}} 円</td>
                        <td class="w-1/6">{{cartitem.itemNum}} 個</td>
                        <td class="w-1/6">{{cartitem.price*cartitem.itemNum}} 円</td>
                        <td class="w-1/6"><img src="~/assets/img/trash.png" class="w-1/3"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button v-show="this.order==false" @click="OrderMove()"  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                注文に進む
            </button>
        </div>
        <!-- <div v-show="this.order=true"><CartOrderInfo/></div> -->
        <div class="p-3 shadow-xl">
        <client-only>
        <CartOrderInfo v-show="this.order==true"/>
        </client-only>
        </div>
        <div>{{ userFromStore.uid }}</div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { itemInfoStore, UserStore } from '../store'

export default Vue.extend({
    data(){
        return {
            order:false,
            carts:[
                {
                name: 'コーヒー',
                price: 500,
                img: "https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111",
                id: 15,
                itemNum: 2
                },
                {
                name: 'コーヒー',
                price: 500,
                img: "https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111",
                id: 14,
                itemNum: 2
                },
                {
                name: 'コーヒー',
                price: 500,
                img: "https://firebasestorage.googleapis.com/v0/b/nuxt-ts-coffee-app.appspot.com/o/18.jpg?alt=media&token=400c837e-5542-4990-a656-af263a859111",
                id: 13,
                itemNum: 2
                }
            ]
        }
    },
    methods:{
        OrderMove(){
            this.order=true
            console.log('move')
            console.log('選ばれた= '+itemInfoStore)
        }
    },
    computed:{
        userFromStore() {
            return UserStore.getUserInfo
        }
    }
})
</script>