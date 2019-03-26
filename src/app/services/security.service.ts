import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductResponse } from "./models/responses/product-response";
import { CatalogResponse } from "./models/responses/catalog-response";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Product, Images, Images64Bits } from '.././app.models';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogRequest } from './models/requests/catalog-request';
import { RequestPayload, KeyRequest } from './models/requests/key-request';
import { KeyResponse } from './models/responses/key-response';

@Injectable()
export class SecurityService {

  private catalogResponse: CatalogResponse;
  private productList: Product[];
  private productResponse: ProductResponse;

  constructor(private _httpClient: HttpClient, private _http: Http) {

  }

  public getTokenAuthentication(idKey: string): Observable<KeyResponse> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    let requestPayload = new RequestPayload(idKey);
    let keyRequest = new KeyRequest(requestPayload);

    return this._http
      .post(environment.URLSecurity + environment.endPointGenerateToken, keyRequest, options)
      .pipe(
        map(((response: any) => {
          return response.responsePayload;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public validateTokenBySession():Headers {

    let accessKid = localStorage.getItem('access_token');
    if (accessKid === undefined) {
      this.getTokenAuthentication("1").subscribe(data => {
        this.setSession(data);
        accessKid = localStorage.getItem('access_token');
      });
    }

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': localStorage.key, 'X-IPAddr': location.host
      , 'X-Session': accessKid, 'X-Channel': 1
    });

    return headers;

  }

  private setSession(authResult): void {

    localStorage.setItem('access_token', authResult.token);

  }

}