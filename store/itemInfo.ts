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
    public order:null|cartItemType=null;

    //getters-----------------------------------------------
    public get getitemInfo(): cartItemType[]{
        return this.itemInfo.filter(item=>item.status===0);
    }
    public get getOrderId():string|null|undefined{
      return this.itemInfo.length>0?this.itemInfo[0].orderId:null
    }

    //mutation-----------------------------------------------
    @Mutation
    private fetchitemInfoMut(itemInfoFromDb:cartItemType):void{
       // let itemInfoFromDB = {...itemInfoFromDb}
        this.itemInfo.push(itemInfoFromDb)
        //this.order=itemInfoFromDb;
    }
    // private fetchuserUidMut(userUidFromDb:string):void{
    //     this.
    // }


    @Mutation
    public updateOrderMut(orderInfoToDb,orderId){
       
        //orderInfoToDb.orderId=orderId;
        console.log(this.getitemInfo+orderInfoToDb+orderId)
        this.itemInfo=[]
    }


    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
            await db.collection(`users/${UserStore.userInfo!.uid}/order`).get().then(itemInfoAll =>{
            console.log("配列の長さ"+itemInfoAll.docs.length+this.itemInfo.length)
            if(itemInfoAll.docs.length!==this.itemInfo.length){
            itemInfoAll.forEach(itemInfo=>{
                // itemInfo.forEach(el => {
                    let itemInfoFromDb:cartItemType = itemInfo.data()
                    itemInfoFromDb = {...itemInfoFromDb,orderId:itemInfo.id}
                    this.fetchitemInfoMut(itemInfoFromDb)
                    // })
                // }
            })}
        })
    }
}
