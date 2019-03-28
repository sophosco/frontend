import { CardCredit } from "./cardCredit";
import { PaymentGateway } from "./paymentGateway";
import { CustomerPortfolio } from "./customerPortfolio";

  
     export class Payment{
      constructor(
       public cardCredit: CardCredit,
       public paymentGateway: PaymentGateway,
       public customerPortafolio: CustomerPortfolio
      ){} 
      } 