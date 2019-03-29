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
import { User } from '../models/user';
import { UserRequest } from './models/requests/user-request';
import { UserResponse } from './models/responses/user-response';

@Injectable()
export class SecurityService {

  public userSession: User;

  constructor(private _httpClient: HttpClient, private _http: Http) {

  }

  public getvalidateUserAccount(email: string, password: string): Observable<UserResponse> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'application/json',
    });

    let options = new RequestOptions({ headers: headers });

    let userRequest = new UserRequest(localStorage.key + 'id_Session', email, password);

    return this._http
      .post(environment.URLLogin + environment.endPointLogin, userRequest, options)
      .pipe(
        map(((response: any) => {
          return JSON.parse(response);
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getTokenAuthentication(idKey: string): Observable<KeyResponse> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'application/json',
    });

    let options = new RequestOptions({ headers: headers });

    let requestPayload = new RequestPayload(idKey);
    let keyRequest = new KeyRequest(requestPayload);

    return this._http
      .post(environment.URLSecurity + environment.endPointGenerateToken, keyRequest, options)
      .pipe(
        map(((response: any) => {
          this.setSession(JSON.parse(response._body).responsePayload);
          return JSON.parse(response._body).responsePayload;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public validateTokenBySessionUser(): boolean {
    let accessKid = localStorage.getItem('access_token');
    if (accessKid == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public getHeaderTokenBySession(): Headers {

    let accessKid = localStorage.getItem('access_token');

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': localStorage.key, 'X-IPAddr': location.host
      , 'X-Session': accessKid, 'X-Channel': 1
    });

    return headers;

  }

  public isAuthenticated(): boolean {
    let accessUser = this.userSession;
    if (accessUser == null) {
      return true;
    }
    else {
      return false;
    }
  }

  private setSession(authResult): void {

    localStorage.setItem('access_token', authResult.token);

  }

  public logInSession(userSession) {
    
    this.userSession = userSession;
    localStorage.setItem('access_user', userSession);
  }

  public logOutSession() {

    localStorage.clear;
    this.userSession = null;

  }

}