import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';
import { Payment } from '../models/payment';
import { EncripterService } from './encripter.service';
import { PaymentRequest } from './models/requests/payment-request';

@Injectable()
export class PaymentService {

  constructor(private _http: Http,
    private securityService: SecurityService) { }

  public createPayment(payment: any): Observable<Payment> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post(environment.URLPayment + environment.endPointGetPayment, '{ "payment":"' + payment + '"}', options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}