import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { db } from "~/plugins/firebase";
import { itemType } from '../types/itemType'
import { userInfoType } from '../types/userInfoType'

@Module({ name: 'itemInfo', namespaced: true, stateFactory: true})

export default class itemInfoStore extends VuexModule {

    //state-------------------------------------------------
    public itemInfo:itemType[] = [];
    public user:userInfoType[] = [];

    //getters-----------------------------------------------
    public get getitemInfo(): itemType[]{
        return this.itemInfo;
    }
    public get getUser(): userInfoType[]{
        return this.user;
    }


    //mutation-----------------------------------------------
    @Mutation
    public fetchitemInfoMut(itemInfoFromDb:itemType):void{
        this.itemInfo.push(itemInfoFromDb);
    }

    @Mutation
    public fetchUserMut(userFromDb:userInfoType):void{
        this.user.push(userFromDb);
    }

    //action-------------------------------------------------
    @Action({rawError: true})
    public async fetchitemInfoAct(): Promise<void>{
        // await db.collection('users').doc('qbzuLbjc7JMpZvf4PIH68MEVKIU2').collection('order').doc('vf8ZDz28meYUAOXQLS7M').get().then(itemInfo_all =>{
        //     itemInfo_all.forEach(itemInfo=>{
        //         const itemInfoFromDb: itemType = itemInfo.data()
        //         this.fetchitemInfoMut(itemInfoFromDb)
        //     })
        // })
    }

    @Action({rawError: true})
    public async fetchUserAct(): Promise<void>{
        await db.collection(`users`).get().then(users=>{
            users.forEach(user=> {
                const userFromDb:userInfoType = user.data()
                this.fetchUserMut(userFromDb)
            })
            console.log('アカウント= '+users)
        })
    }
}