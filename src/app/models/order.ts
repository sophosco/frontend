export class Order {
    constructor(public id: number, 
                public billing:Billing, 
                public deliveryMethod: Delivery,
                public paymentMethod: Payment
                ){}
  }

  
  export class Billing{
    constructor(

      public firstName: String,
      public lastName:  String,
      public middleName: String, 
      public company: String,
      public email: String,
      public phone: String,
      public country: ICountry, 
      public city: String,
      public state: String,
      public zip:  String,
      public address: String
    ){}
    }

    export interface ICountry{
        name:String,
        code: String
    }
  
    export class Delivery{  
      constructor(
        public id: number,
        public delivery: IDelivery
      ){}
      }


      export interface IDelivery{
        desc:number,
        name:String,
        value: String
    }

  
     export class Payment{
     constructor(
      public cardHolderName: String,
      public cardNumber: String,
      public expiredMonth: String,
      public expiredYear: String,
      public cvv:  String
     ){} 
     }  
  
  
    
  
  