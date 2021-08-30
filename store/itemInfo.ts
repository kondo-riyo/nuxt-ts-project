import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { db } from "~/plugins/firebase";
import {UserStore} from "../store";

interface itemInfoType {
    id?:string,
    itemId?:number,
    itemNum?:string
}

@Module({ name: 'itemInfo', namespaced: true, stateFactory: true})

export default class itemInfoStore extends VuexModule {

    //state-------------------------------------------------
    public itemInfo: itemInfoType[] = [];
    public userUid: string='';

    //getters-----------------------------------------------
    public get getitemInfo(): itemInfoType[]{
        return this.itemInfo;
    }

    //mutation-----------------------------------------------
    @Mutation
    private fetchitemInfoMut(itemInfoFromDb:itemInfoType):void{
        this.itemInfo.push(itemInfoFromDb);
    }
    // private fetchuserUidMut(userUidFromDb:string):void{
    //     this.
    // }
    


    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
            await db.collection(`users`).doc(`${UserStore.getUserInfo?.uid}`).collection(`order`).doc(`v2uIP282QlyEGpJeb7yV`).collection(`itemInfo`).get().then(itemInfoAll =>{
            itemInfoAll.forEach(itemInfo=>{
                const itemInfoFromDb:itemInfoType = itemInfo.data()
                this.fetchitemInfoMut(itemInfoFromDb)
            })
        })
    }
}