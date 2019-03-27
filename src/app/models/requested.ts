import { Cart } from "./cart.model";
import { Delivery } from "./delivery";
import { Billing } from "./billing";
import { Payment } from "./payment";

export class Requested {
    constructor(public idRequested: number, 
                public createDate: Date,
                public state:String, 
                public billing: Billing,
                public delivery: Delivery,
                public payment: Payment,
                public cart:Cart
                ){}
  }


  
    
  
  