export interface userInfoType {
    email?:string;
    password?:string;
    name?:string;
    tel?:string;
    postalcode?:string;
    address?:string;
    uid?:string|null
}


export interface userLoginType {
    email:string;
    password:string;
}

export interface orderInfoType {
    userInfo?:userInfoType|null
    name?: string,
    email?: string,
    postalcode?: string,
    address?: string,
    tel?: string,
    deliveryDate: string,
    deliveryTime: string,
    payment: number,
    creditCardNum: string,
    selectPayment: boolean

}

export interface orderInfoDataType {
    userInfo:orderInfoDataType
}