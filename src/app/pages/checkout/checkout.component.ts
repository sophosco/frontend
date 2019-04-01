import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, MatSnackBar } from '@angular/material';
import { AppService, Data } from '../../app.service';
import { Utils } from '../../services/utils/utils';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.services';
import { Product } from 'src/app/app.models';
import { Cart } from 'src/app/models/cart.model';
import { Payment } from 'src/app/models/payment';
import { OrderRequest } from 'src/app/services/models/requests/order-request';
import { PaymentRequest } from 'src/app/services/models/requests/payment-request';
import { PaymentService } from 'src/app/services/payment.service';
import { ModalService } from 'src/app/services/modal.service';
import { okPay } from 'src/app/models/okpay';
import { ProductService } from 'src/app/services/product.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  bodyText: string;
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  customerPortfolio: FormGroup;
  debitForm: FormGroup;
  EfectyGruop: FormGroup;
  formaPago: string = "paymentForm";
  countries = [];
  documents = [];
  typesPeople = [];
  months = [];
  bancos = [];
  years = [];
  portafolio = [];
  deliveryMethods = [];
  grandTotal = 0;
  modo: string;
  subModo: string;
  cart: Cart;
  productsV: Product[];
  authorizationId: Number;
  okPay: okPay;
  validarPago:boolean;
  


  constructor(public appService: AppService, public cartService: CartService, public orderService: OrderService,
    public formBuilder: FormBuilder, public util: Utils, private paymentServices: PaymentService,
    private orderServices: OrderService, private modalService: ModalService, private productService: ProductService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cartService.Data.products.forEach(product => {
      this.grandTotal += product.cartCount * product.newPrice;
    });
    this.okPay = new okPay("", "", 0, new Date(), "", "", 0, 0, "", 0, "", "", 0, "");
    this.bodyText = 'This text can be updated in modal 1';
    this.countries = this.util.getCountries();
    this.documents = this.util.getDocuments();
    this.typesPeople = this.util.getTypesPeople();
    this.months = this.util.getMonths();
    this.bancos = this.util.getGrupoAval();
    this.years = this.util.getYears();
    this.deliveryMethods = this.util.getDeliveryMethods();
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

    this.EfectyGruop = this.formBuilder.group({
      debitHolderName: ['', Validators.required],
      idCedula: ['', Validators.required]
    })
    this.customerPortfolio = this.formBuilder.group({
      authorizationId: '',
      entityCode: ['', Validators.required],
      tokenAuthorization: '',
      debitHolderName: ['', Validators.required],
      applicationDate: '',
      portafolio: ['', Validators.required]
    });

    this.debitForm = this.formBuilder.group({
      authorizationId: '',
      entityCode: ['', Validators.required],
      applicationDate: '',
      debitHolderName: ['', Validators.required],
      documentType: ['', Validators.required],
      document: ['', Validators.required],
      personType: ['', Validators.required],
      phone: ['', Validators.required],
      email: ''
    });
    this.validarPago=false;
  }


  public placeOrder() {
    let message, status;

    this.productService.reserveProducts(this.cartService.Data.products).subscribe(messageReserved=>{
 

      if(messageReserved == 'Reserva exitosa'){
        this.cart = new Cart(null, null, this.cartService.Data.products, this.cartService.Data.totalPrice,
          this.cartService.Data.products.length);
    
        let order = new Order(1, 1, this.billingForm.value, this.deliveryForm.value, this.paymentForm.value, this.cart);
    
        //Crea Orden
        this.orderService.createOrder(order).subscribe(data => {
          console.log(data);
        });
      }else{
        message = messageReserved;
        status = 'success';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
    });

   

    // this.horizontalStepper._steps.forEach(step => step.editable = false);
    // this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }

  validar(grupo:FormGroup){
    this.validarPago=grupo.valid
  }

  public placePayment(context) {

    let payment = new Payment(1, 1, this.paymentForm.value, this.debitForm.value, this.customerPortfolio.value);
            
    //Realiza Pago
    this.paymentServices.createPayment(payment).subscribe(data =>
      console.log(data)
    )
    
    this.createModal();

    if(this.validarPago){
      this.horizontalStepper._steps.forEach(step => step.editable = false);
      this.verticalStepper._steps.forEach(step => step.editable = false);
    }


    this.openModal(context)

    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }


  createModal() {
    let estado = 'Aprobado';
    let idTrans = Math.floor(Math.random() * (10000000000 - 1000000000 + 1)) + 1000000000;
    let cus = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000;
    let empresa = 'SophoStore';
    let fecha = new Date();
    let valor = this.grandTotal;
    let moneda = 'COP';
    let nit = 9999999999;
    let telefono = 17433001;
    let ip = location.host

    if (this.modo == 'Tarjetas') {
      this.validar(this.paymentForm)
      let banco = ['PayPal', 'Visa', 'American Express', 'MasterCard', 'Discover']
      let bancoIndex = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
      console.log(bancoIndex)
      console.log(banco[bancoIndex])
      let descripcion = 'Plataforma de pago SophoStore con Tarjeta de Credito'
      this.okPay = new okPay(this.paymentForm.controls.cardHolderName.value,
        empresa, nit, fecha, estado, this.paymentForm.controls.cardNumber.value, idTrans, cus, banco[bancoIndex],
        valor, moneda, descripcion, telefono, ip)
    }
    if (this.modo == 'Debito') {
      this.validar(this.debitForm)
      let referencia = Math.floor(Math.random() * (1000000000000 - 100000000000 + 1)) + 100000000000;
      let banco = this.util.getNameByEntityCode(this.debitForm.controls.entityCode.value);
      let descripcion = 'Plataforma de pago SophoStore con PSE'
      this.okPay = new okPay(this.debitForm.controls.debitHolderName.value, empresa, nit, fecha, estado,
        referencia + "", idTrans, cus, banco, valor, moneda, descripcion, telefono, ip)
    }
    if (this.subModo == 'Efecty') {
      this.validar(this.EfectyGruop)
      let banco = 'Efety'
      let descripcion = 'Plataforma de pago SophoStore con Efecty'
      this.okPay = new okPay(this.EfectyGruop.controls.debitHolderName.value, empresa, nit, fecha, estado,
        this.EfectyGruop.controls.idCedula.value, idTrans, cus, banco, valor, moneda, descripcion, telefono, ip)
    }
    if (this.subModo == 'Portafolio') {
      this.validar(this.customerPortfolio)
      let descripcion = 'Plataforma de pago SophoStore con Portafolio'
      let referencia = this.util.getNamePortafolioByEntityCode(this.customerPortfolio.controls.portafolio.value)
      let banco = this.util.getNameByEntityCode(this.customerPortfolio.controls.entityCode.value);
      this.okPay = new okPay(this.customerPortfolio.controls.debitHolderName.value, empresa, nit, fecha, estado,
        referencia, idTrans, cus, banco, valor, moneda, descripcion, telefono, ip)
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }



  public convertProductToProduct(productDataArray: Product[]): Product[] {
    let productArray = []
    productDataArray.forEach(element => {
      element.images = null;
      productArray.push(element);
    });
    return productArray;
  }

  public modoChanged(value: string, fomPay: string) {
    this.modo = value;
    this.subModo = "";
    this.formaPago = fomPay;
  }

  public subModoChanged(value: string, fomPay: string) {
    this.subModo = value;
    this.formaPago = fomPay;
  }

  public getPortafolioByBanco(banco) {
    console.log(banco);
    this.portafolio = this.util.getPortafolioByBanco(banco);
  }

}
