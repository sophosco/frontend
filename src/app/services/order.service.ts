import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { OrderRequest } from './models/requests/order-request';
import { SecurityService } from './security.service';

@Injectable()
export class OrderService {
  
  constructor(private _http: Http, private securityService:SecurityService) { }

  public createOrder(order: Order): Observable<Order> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    order.idSession =  parseInt(headers.get("X-RqUID")) ;

    return this._http
      .post(environment.URLOrder + environment.endPointGetOrder, order, options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}