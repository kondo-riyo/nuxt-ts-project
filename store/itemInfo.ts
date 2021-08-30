import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { db } from "~/plugins/firebase";

interface itemInfoType {
    id?:string,
    itemId?:number,
    itemNum?:string
}

@Module({ name: 'itemInfo', namespaced: true, stateFactory: true})

export default class itemInfoStore extends VuexModule {

    //state-------------------------------------------------
    public itemInfo: itemInfoType[] = [];

    //getters-----------------------------------------------
    public get getitemInfo(): itemInfoType[]{
        return this.itemInfo;
    }

    //mutation-----------------------------------------------
    @Mutation
    private fetchitemInfoMut(itemInfoFromDb:itemInfoType):void{
        this.itemInfo.push(itemInfoFromDb);
    }

    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
        console.log("アクション！！！")
            await db.collection(`users/a7SrZhtOmWS2Yol8J3LD/order/v2uIP282QlyEGpJeb7yV/itemInfo`).get().then(itemInfoAll =>{
            itemInfoAll.forEach(itemInfo=>{
                const itemInfoFromDb:itemInfoType = itemInfo.data()
                this.fetchitemInfoMut(itemInfoFromDb)
            })
        })
    }
}