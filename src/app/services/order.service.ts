import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { SecurityService } from './security.service';
import { EncripterService } from './encripter.service';

@Injectable()
export class OrderService {

  constructor(private _http: Http,
    private encripterService: EncripterService,
    private securityService: SecurityService) { }

  public createOrder(order: any): Observable<Order> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(environment.URLOrder + environment.endPointGetOrder, '{ "order":"' + order + '"}', options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}