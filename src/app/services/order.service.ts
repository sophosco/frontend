import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { OrderRequest } from './models/requests/order-request';

@Injectable()
export class OrderService {
  
  constructor(private _http: Http) { }

  public createOrder(order: Order): Observable<String> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'asd', 'X-IPAddr': 'asd',
      'X-Sesion': 'dassdasd',
      'X-haveToken': 'false',
      'X-isError': 'false',
      'X-Channel': 'asd'
    });

    let options = new RequestOptions({ headers: headers });

    let orderRequest = new OrderRequest(order);

    

    return this._http
      .post('http://SBBOGLAPPROJB14.sophos.col.com:18080//api/orden/add', orderRequest, options)
      .pipe(
        map(((response: any) => {
          return response.reponse.approvalCode;
        }),
          catchError((e: Response) => throwError(e)))
      );

     /* return this._http
      .post(environment.URLService + '/api/orden/add', orderRequest, options)
      .pipe(
        map(((response: any) => {
          return response.reponse.approvalCode;
        }),
          catchError((e: Response) => throwError(e)))
      );*/
      



  }

}