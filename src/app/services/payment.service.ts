import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { OrderRequest } from './models/requests/order-request';

@Injectable()
export class PaymentService {
  
  constructor(private _http: Http) { }

  public createPayment(order: Order): Observable<String> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'application/json', 'X-IPAddr': 'application/json'
      , 'X-Session': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    let payment = new OrderRequest("Session_id_112", order);

    return this._http
      .post(environment.URLService + '/api/payment/add', payment, options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );
      



  }

}