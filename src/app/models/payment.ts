import { CardCredit } from "./cardCredit";
import { PaymentGateway } from "./paymentGateway";
import { CustomerPortfolio } from "./customerPortfolio";

  
     export class Payment{
      constructor(
       public idSession: number,
       public idUser: number,    
       public cardCredit: CardCredit,
       public paymentGateway: PaymentGateway,
       public customerPortafolio: CustomerPortfolio
      ){} 
      } 