import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { CategoryResponse } from "./models/responses/category-response";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Category, Product } from '.././app.models';

@Injectable()
export class CategoryService {

  public url = "assets/data/";
  private categoryResponse: CategoryResponse;
  private category:Category[];

  constructor(private _httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'application/json', 'X-IPAddr': 'application/json'
      , 'X-Session': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    return this._httpClient
      .get(environment.URLService + 'category/read_all.php')
      .pipe(
        map(((response: any) => {
          this.categoryResponse = response;
          if (this.categoryResponse.categories.length > 0) {
            this.category = this.categoryResponse.categories;
          }
          return this.category;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getCategoriesMock(): Observable<Category[]> {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'X-RqUID': 'application/json', 'X-IPAddr': 'application/json'
      , 'X-Session': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    return this._httpClient
      .get(this.url + 'categoriesResponse.json')
      .pipe(
        map(((response: any) => {
          this.categoryResponse = response;
          if (this.categoryResponse.categories.length > 0) {
            this.category = this.categoryResponse.categories;
          }
 
          return this.category;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

}
