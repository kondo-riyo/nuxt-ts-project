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
    // @Mutation
    // private deleteCartItemMut(id:string):void{
    //     const index = this.itemInfo.findIndex(item => item.id ==id)
    //     this.itemInfo.splice(index,1)
    // }

    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
            await db.collection(`users/${UserStore.userInfo!.uid}/order`).get().then(itemInfoAll =>{
            if(itemInfoAll.docs.length>this.itemInfo.length){
            itemInfoAll.forEach(itemInfo=>{
                // itemInfo.forEach(el => {
                    const itemInfoFromDb:cartItemType = itemInfo.data()
                    this.fetchitemInfoMut(itemInfoFromDb)
                    // })
                // }
            })}
        })
    }

//     @Action({rawError: true})
//     public async deleteCartItemAct(id:string): Promise<void>{
//         await db.collection(`users/${UserStore.userInfo!.uid}/order`).doc(id).delete().then(()=> {
//             this.deleteCartItemMut(id)
//         })
//     }
}
