import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { AppService } from '../../app.service';
import { Utils } from '../../services/utils/utils';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.services';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  cartForm: FormGroup;
  customerPortfolio: FormGroup;
  formaPago: string = "paymentForm";
  countries = [];
  months = [];
  bancos = [];
  years = [];
  portafolio =[];
  deliveryMethods = [];
  grandTotal = 0;
  modo:string ;
  subModo: string;

  constructor(public appService:AppService, public utils: Utils, public cartService:CartService,public orderService:OrderService, public formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.cartService.Data.products.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.bancos = this.utils.getGrupoAval();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.customerPortfolio= this.formBuilder.group({
        bancoAval: ['', Validators.required],
        portafolio: ['', Validators.required]
      });
    
    this.cartForm = this.formBuilder.group({
      products: this.cartService.Data.products.forEach(product=>{


        // idProd: product.id
         nameProd: product.name
         oldPrice: product.oldPrice
         //descriptionProd: product.description
         //categoryProdId: product.categoryId

         //console.log("id:" +idProd)
         console.log("PRODUCT.NAME:" +product.name)
        // console.log("NAME:" +nameProd)
        // console.log("nameprod" +oldPrice)
         //console.log("descr:" +this.descriptionProd)
         //console.log("categ: " +this.categoryProdId)
    }),
      totalPrice: this.cartService.Data.totalPrice,
      totalCartCount: this.cartService.Data.products.length
    });

    
  }

  public modoChanged(value: string, fomPay: string){
    this.modo = value;
    this.subModo = "";
    this.formaPago = fomPay;
  } 

  public subModoChanged(value: string, fomPay: string){
    this.subModo = value;
    this.formaPago = fomPay;
  }

  public getPortafolioByBanco(banco){
    console.log(banco);
    this.portafolio = this.utils.getPortafolioByBanco(banco);
  }



  public placeOrder(){
    let order = new Order(1, this.billingForm.value, this.deliveryForm.value, this.paymentForm.value, this.cartForm.value);
//TODO: REVISION Y TERMINAR DE IMPLEMENTAR
    //reservar producto (Exitoso) (car.products)
    //Order create (order)
    //Pago creatre (order.payment)
    console.log(order);
    console.log(JSON.stringify(order));
 /*   this.orderService.createOrder(order).subscribe(data => {
      console.log(data);
    });*/

    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }

}
