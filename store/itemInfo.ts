import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { db } from "~/plugins/firebase";
import { cartItemType } from "~/types/cartItemType";
import { UserStore } from "../store";

// interface itemInfoType {
//     id?:string,
//     itemId?:number,
//     itemNum?:string
// }

@Module({ name: 'itemInfo', namespaced: true, stateFactory: true})

export default class itemInfoStore extends VuexModule {

    //state-------------------------------------------------
    public itemInfo: cartItemType[] = [];
    public userUid: string='';

    //getters-----------------------------------------------
    public get getitemInfo(): cartItemType[]{
        return this.itemInfo.filter(item=>item.status===0);
    }

    //mutation-----------------------------------------------
    @Mutation
    private fetchitemInfoMut(itemInfoFromDb:cartItemType):void{
        this.itemInfo.push(itemInfoFromDb);
    }
    // private fetchuserUidMut(userUidFromDb:string):void{
    //     this.
    // }
    


    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
            await db.collection(`users/${UserStore.userInfo!.uid}/order`).get().then(itemInfoAll =>{
            itemInfoAll.forEach(itemInfo=>{
                // itemInfo.forEach(el => {
                    const itemInfoFromDb:cartItemType = itemInfo.data()
                    this.fetchitemInfoMut(itemInfoFromDb)
                    // })
                // }
            })
        })
    }
}
