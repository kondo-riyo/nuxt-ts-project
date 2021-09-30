import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"
import { db } from "~/plugins/firebase";
import { cartItemType,orderedItemType, orderItemType } from "~/types/cartItemType";
import { UserStore } from "~/store";
@Module({ name: 'cart', namespaced: true ,stateFactory: true})

 export default class CartStore extends VuexModule {
     
    // state----------------------------------------
    //public carts: orderedItemType[]=[];
    public cartWithUser = [];

        //******fromIteminfoStore
    public itemInfo:  orderItemType[] = [];
    public userUid: string='';
    public order:null|cartItemType=null;


    // getters--------------------------------------
    // public get getCart(): orderedItemType[]{
    //     return this.carts
    // }

        //******fromIteminfoStore
    public get getitemInfo():  orderItemType[]{
        return this.itemInfo;
    }

    // mutation-------------------------------------
    @Mutation
    private addItemToCartMut(addItemToCart:orderedItemType, idFromDb:string|null):void{
        if(idFromDb===null)return
    this.itemInfo.push({...addItemToCart,orderId:idFromDb});
    }

        //******fromIteminfoStore
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

    // action--------------------------------------------------------
        //◎カートに追加
    @Action({rawError: true})
    public addItemToCartAct(addItemToCart:cartItemType):void{

        //ランダムな文字列IDを作成
        let specialId = Math.random().toString(36).slice(-8);
        let itemInfo={...addItemToCart,specialId:specialId}
        let _order={itemInfo:[itemInfo],status:0}

        // ログインしていない場合storeにだけ追加
        if(!UserStore.userInfo){
            this.addItemToCartMut(addItemToCart,null);
        }// ログインしてたらdbとstoreに商品追加
        else {
            // 既にカートがあったらOrder/orderInfoコレクション内のitemInfo配列に追加
            if(this.getitemInfo.length>0){
               // console.log("既にカートがあるので既存のカートに商品追加")
                let newCartitems =  {...this.getitemInfo};
                if(newCartitems[0].itemInfo===undefined)return
                newCartitems[0].itemInfo.push(itemInfo);
                if(this.getitemInfo[0].orderId===null) return;

                db.collection(`users/${UserStore.userInfo.uid}/order`).doc(this.getitemInfo[0].orderId).update({
                    itemInfo:[...newCartitems[0].itemInfo]
                }).then(()=>{
                if (this.getitemInfo[0].orderId===undefined) return;
                this.addItemToCartMut(addItemToCart,this.getitemInfo[0].orderId)})
            } else if(this.getitemInfo.length===0) {
            // カートの中身が空だったらOrder/ordrtIdコレクションごと作成
            if(!UserStore.userInfo.uid) return
           // console.log("カートが空なので新たなカートを作成")
            db.collection(`users/${UserStore.userInfo.uid}/order`).add(_order).then(cartItem=>{
                this.addItemToCartMut(_order,cartItem.id)
                this.addItemToNewCart(_order,cartItem.id)
            })
        }        
    }}
    @Action({rawError: true})
        //◎注文
    public updateOrderAct(orderInfoToDb:orderedItemType):void{
        if(orderInfoToDb.orderInfo===undefined)return
        orderInfoToDb.status= orderInfoToDb.orderInfo.payment
        console.log(orderInfoToDb);
        if(UserStore.userInfo){
            db.collection(`users/${UserStore.userInfo.uid}/order`).doc(orderInfoToDb.orderId).update(orderInfoToDb).then(()=>{
                if(orderInfoToDb.orderId===undefined)return
                this.updateOrderMut(orderInfoToDb,orderInfoToDb.orderId)
            })
        }
    }

        //******fromIteminfoStore
    //◎カートの商品情報を取得 
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

    //◎カートから商品削除 
    @Action({rawError: true})
    public async deleteCartItemAct(id:string): Promise<void>{
        let cartOrderId = this.getitemInfo[0].orderId
        if(this.getitemInfo[0].itemInfo===undefined)return
        const deleteCartItemIndex:number = this.getitemInfo[0].itemInfo.findIndex(item=>item.specialId === id )
        this.getitemInfo[0].itemInfo.splice(deleteCartItemIndex,1)
        await db.collection(`users/${UserStore.userInfo!.uid}/order`).doc(`${cartOrderId}`).update({
           itemInfo: this.getitemInfo[0].itemInfo
        })
    }

}
