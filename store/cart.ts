import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "~/plugins/firebase";
import { cartItemType } from "~/types/cartItemType";
import { UserStore } from "~/store";

@Module({ name: 'cart', namespaced: true ,stateFactory: true})

 export default class CartStore extends VuexModule {
     
    // state----------------------------------------
    public cart: cartItemType[]=[];
    public cartWithUser = [];
    //public userInfo:string | null =null

    // getters--------------------------------------
    public get getCart(){
        return this.cart
    }

    // mutation-------------------------------------
    @Mutation
    private  addItemToCartMut(addItemToCart:cartItemType, idFromDb:string|null):void{
    this.cart.push({...addItemToCart,orderId:idFromDb});
    }


    // action---------------------------------------
    @Action({rawError: true})
    public addItemToCartAct(addItemToCart:cartItemType){
        // ログインしていない場合カート商品はstoreにだけ追加
        if(!UserStore.userInfo){
            this.addItemToCartMut(addItemToCart,null);
        }// ログインしてたらdbとstoreにカート商品を追加
        else {
            if(!UserStore.userInfo.uid) return
            db.collection(`users/${UserStore.userInfo.uid}/order`).add(addItemToCart).then(cartItem=>{
                console.log(cartItem);
                this.addItemToCartMut(addItemToCart,cartItem.id)
            })
        }        
    }
}
