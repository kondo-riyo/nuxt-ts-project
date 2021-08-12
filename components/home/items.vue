<template>
    <div>
        <h2>home / items.vue</h2>
        <button><router-link to="/ItemDetail">詳細へ</router-link></button>
    </div>
</template>

<script>
import Vue from 'vue'
import { ItemsStore } from '../../store'

export default Vue.extend ({
    computed:{
        itemsFromStore(){
            return ItemsStore.getItems()
        }
    }
})
</script>