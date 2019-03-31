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

  public createOrder(order: Order): Observable<String> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let orderRequest = new OrderRequest(headers.get("X-RqUID"), order);

    return this._http
      .post(environment.URLOrder + environment.endPointGetOrder, orderRequest, options)
      .pipe(
        map(((response: any) => {
          return response.reponse.approvalCode;
        }),
          catchError((e: Response) => throwError(e)))
      );
      



  }

}