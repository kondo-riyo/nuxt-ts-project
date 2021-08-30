import { toppingType } from "./toppingType";
export interface cartItemType {
    itemId?:number;
    itemName?:string;
    itemPrice?:number;
    itemImg?:string;
    itemNum?:number;
    toppings?: toppingType[];
    orderId?:string|null;
    status?:0,
    allToppingPrice?:number;
    totalPrice?:number
}
