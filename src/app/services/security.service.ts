import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { RequestPayload, KeyRequest } from './models/requests/key-request';
import { KeyResponse } from './models/responses/key-response';
import { User } from '../models/user';
import { RequestValidateHeader, RequestValidatePayload, ValidateKeyRequest } from './models/requests/validate-key-request.'; import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Email, EmailRequestPayload, EmailRequestHeader, EmailRequest } from './models/requests/email-request';
import { AuthService } from './auth.service';

@Injectable()
export class SecurityService {

  public userSession: User;

  constructor(private _http: Http,
    public authService: AuthService) {

  }

  public notificateUserEmail(cellPhone: String): Observable<String> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'application/json',
    });

    let options = new RequestOptions({ headers: headers });

    let from: String = 'cristiandaviddallosbustos@gmail.com';
    let to: String = this.authService.userProfile.nickname + '@gmail.com';
    let subject: String = 'Compras SophosStore';
    let text: String = 'Apreciado ' + this.authService.userProfile.name
      + ' gracias por comprar en nuestro portal, su orden ha sido procesada exitosamente';

    let emailUser = new Email(from, to, subject, text);

    let emailRequestPayload = new EmailRequestPayload("57" + cellPhone, emailUser);
    let emailRequestHeader = new EmailRequestHeader(0, true);
    let emailRequest = new EmailRequest(emailRequestHeader, emailRequestPayload);

    return this._http
      .post(environment.URLNotification + environment.endPointNotification, emailRequest, options)
      .pipe(
        map(((response: any) => {
          return JSON.parse(response._body).responsePayload.resumeMail;
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

  public verificateToken(): Observable<string> {

    let headers = this.getHeaderTokenBySession();

    let options = new RequestOptions({ headers: headers });

    let requestHeader = new RequestValidateHeader(headers.get("X-Session"));
    let requestValidatePayload = new RequestValidatePayload("1");
    let validateKeyRequest = new ValidateKeyRequest(requestHeader, requestValidatePayload);

    return this._http
      .post(environment.URLSecurity + environment.endPointVerifyToken, validateKeyRequest, options)
      .pipe(
        map(((response: any) => {
          return JSON.parse(response._body).responseHeader.status.code;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public validateTokenBySessionUser(): boolean {

    if (localStorage.getItem('access_token') == null) {
      return false;
    }
    else {
      return true;
    }
  }

  public getHeaderTokenBySession(): Headers {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': localStorage.getItem('access_id_session'), 'X-IPAddr': location.host,
      'X-Session': localStorage.getItem('access_token'),
      'X-Sesion': localStorage.getItem('access_token'), 'X-Channel': 1
    });

    return headers;

  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("access_user") == null) {
      return false;
    }
    return true;
  }

  public getIdSession(): String {
    return localStorage.getItem('access_id_session');
  }

  public getUserSession(): User {
    if (localStorage.getItem("access_user") != null) {
      return JSON.parse(localStorage.getItem("access_user"));
    }
  }

  private setSession(authResult): void {
    localStorage.setItem('access_token', authResult.token);
  }

  public setSessionRemove(): void {
    localStorage.removeItem('access_token');
  }

  public logInSession(userSession) {
    localStorage.setItem('access_user', JSON.stringify(userSession));
    localStorage.setItem('access_id_session', userSession.sub);
  }

  public logOutSession() {

    localStorage.removeItem('access_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_id_session');
    this.userSession = null;

  }

}
