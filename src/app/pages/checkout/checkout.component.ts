import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
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
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;

  constructor(public appService:AppService, public cartService:CartService,public orderService:OrderService, public formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
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
    this.cartForm = this.formBuilder.group({
      compareList:      this.cartService.Data.products.forEach(cartProduct=>{
        this.cartService.Data.compareList.forEach(product=>{
          if(cartProduct.id == product.id){
            product.cartCount = cartProduct.cartCount;
          }
        });
      }),
      wishList:this.cartService.Data.products.forEach(cartProduct=>{
        this.cartService.Data.wishList.forEach(product=>{
          if(cartProduct.id == product.id){
            product.cartCount = cartProduct.cartCount;
          }
        });
      }),
      products: this.cartService.Data.products.forEach(product=>{
        this.cartService.Data.totalPrice = this.cartService.Data.totalPrice + (product.cartCount * product.newPrice);
        this.cartService.Data.totalCartCount = this.cartService.Data.totalCartCount + product.cartCount;
    }),
      totalPrice: this.cartService.Data.totalPrice,
      totalCartCount: this.cartService.Data.products.length
    });
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
