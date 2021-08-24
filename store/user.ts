import firebase , { auth } from '../plugins/firebase';
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { Cookies } from '~/plugins/cookie'
import { userInfoType } from '../types/userInfoType'
@Module({ name: 'user', namespaced: true ,stateFactory: true})
export default class UserStore extends VuexModule {
    //state----------------------------
    public userInfo:userInfoType|null=null;
    //  public uid:string ="";

    //getters--------------------------
    public get getUserInfo():userInfoType|null{
        return this.userInfo
    }

    public get isAuthenticated(): string | null | undefined{
        // userのidが存在するかチェック
        return this.userInfo && this.userInfo.uid
    }


    //Mutations------------------------
    @Mutation
    public setUserMut(userInfo:userInfoType):void{
        this.userInfo = userInfo;
    }

    @Mutation
    public setUserNullMut(userInfo:null):void{
        this.userInfo = null;
    }

    // private setUid(uid:string):void{
    //     console.log('setUid')
    //     this.uid = uid;
    // }

    //Action---------------------------
    @Action({rawError: true})
    public async loginAct(email:string,uid:string): Promise<void>{
        if (auth.currentUser===null) return;
        const token = await auth.currentUser.getIdToken(true);
        console.log("トークン"+token);
        const userInfo = {
            email: email,
            uid: uid
          }
        Cookies.set('access_token', token)  // ②-2 取得したJWTをCookieにセット
        await this.setUserMut(userInfo) // ②-3 userデータをストアstateに保存
       // await this.setUid(userInfo.uid) // ②-3 userデータのuidをストアstateに保存
    }

    @Action({rawError: true})
    public async setUserAct(userInfo:userInfoType):Promise<void>{
       await this.setUserMut(userInfo)
    }

    @Action({rawError: true})
    public async logout():Promise<void>{
        await auth.signOut();
        Cookies.remove('access_token');
        await this.setUserNullMut(null);
    }
}


// async logout({commit}) {
//     console.log('[STORE ACTIONS] - logout')
//     await firebase.auth().signOut()

//     Cookies.remove('access_token');
//     commit('setUSER', null)
//     commit('saveUID', null)
//   },
