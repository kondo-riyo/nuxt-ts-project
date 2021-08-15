<template>
    <div class="flex items-center container m-4">
        <!-- <input class='w-3/6 p-2 py-2 mr-2 rounded-md border border-gray-300 focus:outline-none' placeholder="Search" v-model='keyWord'/> -->
        <!-- <img src="../../assets/img/search.png" class="block w-6" style="margin-left: -3rem;" @click="search" > -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ItemsStore } from '../../store';

// type DataType = {
//   // Dataを追加したら、ココの型も追加する
//   keyWord: string
// }

export default Vue.extend({
    // data():DataType{
    //     return{
    //         keyWord:""
    //     }
    // },
    methods:{
        // search(){
        //     console.log("サーチ"+this.keyWord)
        //    ItemsStore.searchItemsAct(this.keyWord)
        // }
    }
})
</script>