import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { SecurityService } from './security.service';
import { Payment } from '../models/payment';

@Injectable()
export class PaymentService {

  constructor(private _http: Http, private securityService: SecurityService) { }

  public createPayment(payment: Payment): Observable<Payment> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    payment.idSession = parseInt(headers.get("X-RqUID")) ;

    return this._http
      .post(environment.URLPayment + environment.endPointGetPayment, payment, options)
      .pipe(
        map(((response: any) => {
          return response.json();
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}