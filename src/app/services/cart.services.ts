import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Product } from '../app.models';
import { Cart } from '../models/cart.model';
import { environment } from 'src/environments/environment';
import { CartRequest } from './models/requests/cart-request';
import { RequestOptions, Headers, Http } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { CartResponse } from './models/responses/cart-response';
import { SecurityService } from './security.service';

@Injectable()
export class CartService {
  public Data = new Cart(
    [], // compareList
    [],  // wishList
    [],  // cartList
    null, //totalPrice,
    0 //totalCartCount
  )

  private cartResponse: CartResponse;

  constructor(public http: HttpClient,
    private securityService: SecurityService,
    public snackBar: MatSnackBar, private _http: Http) { }

  public addToCart(product: Product) {
    let message, status;

    this.Data.totalPrice = null;
    this.Data.totalCartCount = null;

    if (this.Data.products.filter(item => item.id == product.id)[0]) {
      let item = this.Data.products.filter(item => item.id == product.id)[0];
      item.cartCount = product.cartCount;
    }
    else {
      this.Data.products.push(product);
    }
    this.Data.products.forEach(product => {
      this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
      this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
    });

    message = 'El producto ' + product.name + ' ha sido añadido al carrito.';
    status = 'success';
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    this.updateCart(this.Data).subscribe(data => {
      
    });
  }

  public resetProductCartCount(product: Product) {
    product.cartCount = 0;
    let compareProduct = this.Data.compareList.filter(item => item.id == product.id)[0];
    if (compareProduct) {
      compareProduct.cartCount = 0;
    };
    let wishProduct = this.Data.wishList.filter(item => item.id == product.id)[0];
    if (wishProduct) {
      wishProduct.cartCount = 0;
    };
  }

  public updateCart(data: Cart):Observable<string>{

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    data.compareList = null;
    data.wishList = null;
    let cartRequest = new CartRequest(headers.get("X-RqUID"), data);

    return this._http
      .post(environment.URLCard + environment.endPointUpdateCart, cartRequest, options)
      .pipe(
        map(((response: any) => {
          return response;
        }),
          catchError((e: Response) => throwError(e)))
      );
  }

  public getCart(idSession: String) {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let getCartRequest = { "IdSesion": idSession };

    return this._http
      .post(environment.URLCard + environment.endPointGetCart, getCartRequest, options)
      .pipe(
        map(((response: any) => {
          this.cartResponse = response.json();
          if (this.cartResponse.cart != null) {
            this.Data = this.cartResponse.cart;
          }
          return this.Data;
        }),
          catchError((e: Response) => throwError(e)))
      );
  }
} 