<template>
    <div>
        <h1>ホーム(Home.vue)</h1>
        <HomeSearch/>
        <HomeItems/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ItemsStore } from '../store'
import itemType from '../types/itemType'


type DataType = {
  // Dataを追加したら、ココの型も追加する

}


export default Vue.extend({

 // ssr時にdbからデータを取っておきたい
  async fetch() {
    // stateの中身が空だったらdbからデータを取得
    // 空判定を行うことで、fetchが発動する度に何度も同じデータを取得することを防ぐ
    if (ItemsStore.items.length === 0) {
      await ItemsStore.fetchItemsAct()
    }
  },
})

</script>
