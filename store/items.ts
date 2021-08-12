import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "~/plugins/firebase";
import itemType from '../types/itemType'


@Module({ name: 'items', namespaced: true ,stateFactory: true})

 export default class ItemsStore extends VuexModule {

    // state-----------------------------------------------------
   public items:itemType[] = []

    //getters----------------------------------------------------
    public get getItems(): itemType[]{
        return this.items
    }

    // mutation--------------------------------------------------
    @Mutation
    private fetchItemsMut(itemsFromDb:itemType):void{
        this.items.push(itemsFromDb)
    }

    // action----------------------------------------------------
    // データ取得-----------------
     @Action({rawError: true})
      public async fetchItemsAct(): Promise<void>{
       await db.collection(`items`).get().then(items=>{
            items.forEach(item=>{
                 const itemsFromDb:itemType = item.data()
                 this.fetchItemsMut(itemsFromDb)
            })
        })
        }


}
