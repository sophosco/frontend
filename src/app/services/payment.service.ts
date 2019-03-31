import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { PaymentRequest } from './models/requests/payment-request';
import { Payment } from '../models/payment';

@Injectable()
export class PaymentService {
  
  constructor(private _http: Http) { }

  public createPayment(payment: Payment): Observable<String> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': '123', 'X-IPAddr': '231',
      'X-Sesion': 'asdasd',
      'X-haveToken': 'false',
      'X-isError': 'false',
       'X-Channel': '13123'
    });


   /* let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'application/json', 'X-IPAddr': 'application/json'
      , 'X-Session': 'application/json'
    });*/

   

    let options = new RequestOptions({ headers: headers });

    let paymentRequest = new PaymentRequest(payment);


    return this._http
      .post('http://SBBOGLAPPROJB14.sophos.col.com:18080/api/payment/add', paymentRequest, options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );


    /*  return this._http
      .post('http:// SBBOGLAPPROJB14.sophos.col.com:18080/api/payment/add', paymentRequest, options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );*/


  }

}