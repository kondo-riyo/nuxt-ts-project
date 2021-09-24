import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { db } from "~/plugins/firebase";
import { cartItemType,orderedItemType, otderIemType } from "~/types/cartItemType";
import { UserStore } from "../store";

@Module({ name: 'itemInfo', namespaced: true, stateFactory: true})

export default class itemInfoStore extends VuexModule {

    //state-------------------------------------------------
    public itemInfo:  otderIemType[] = [];
    public userUid: string='';
    public order:null|cartItemType=null;

    //getters-----------------------------------------------
    public get getitemInfo():  otderIemType[]{
        return this.itemInfo;
    }

    //mutation-----------------------------------------------
    @Mutation
    private fetchitemInfoMut(itemInfoFromDb:cartItemType):void{
        console.log('fetchitemInfoMut')
        this.itemInfo.push(itemInfoFromDb)
    }

    @Mutation
    public addItemToNewCart(addItemToCart:orderedItemType,idFromDb:string|null):void{
        this.itemInfo.push({...addItemToCart,orderId:idFromDb})
    }


    @Mutation
    public updateOrderMut(orderInfoToDb:orderedItemType,orderId:string):void{
        this.itemInfo=[]
    }

    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
           await db.collection(`users/${UserStore.userInfo!.uid}/order`).get().then(itemInfoAll =>{
            if(itemInfoAll.docs.length>this.itemInfo.length){
            itemInfoAll.forEach(itemInfo=>{
                    let itemInfoFromDb:cartItemType =  itemInfo.data()
                    if(itemInfoFromDb.status===0){
                    itemInfoFromDb = {...itemInfoFromDb,orderId:itemInfo.id}
                    this.fetchitemInfoMut(itemInfoFromDb)
                    }
            })}
        })
    }

    @Action({rawError: true})
    public async deleteCartItemAct(id:string): Promise<void>{
        let cartOrderId = this.getitemInfo[0].orderId
        if(this.getitemInfo[0].itemInfo===undefined)return
        const deleteCartItemIndex:number = this.getitemInfo[0].itemInfo.findIndex(item=>item.specialId === id )
        this.getitemInfo[0].itemInfo.splice(deleteCartItemIndex,1)
        await db.collection(`users/${UserStore.userInfo!.uid}/order`).doc(`${cartOrderId}`).update({
           itemInfo: this.getitemInfo[0].itemInfo,
        }).then
    }
}
