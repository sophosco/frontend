import { Cart } from "./cart.model";
import { Billing } from "./billing";
import { Delivery } from "./delivery";
import { Payment } from "./payment";

export class Order {
    constructor(public idSession: number, 
                public billing:Billing, 
                public delivery: Delivery,
                public payment: Payment, //TODO: PAYMENT IS NECCESARY
                public cart:Cart
                ){}
  }

  
  
 
  
  
    
  
  