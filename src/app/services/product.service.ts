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
import { SecurityService } from './security.service';
import { ReserveRequest, ReserveRequestPayload, ProductSearch } from './models/requests/reserve-request';

@Injectable()
export class ProductService {

  public url = "assets/data/";
  private catalogResponse: CatalogResponse;
  private productList: Product[];
  private product: Product;
  private productResponse: ProductResponse;
  private productArray: Product[]
  private images: Images[];
  private rating: String[];

  constructor(private _httpClient: HttpClient, private securityService: SecurityService, private _http: Http, private _sanitizer: DomSanitizer) {
    this.rating = [
      "sentiment_very_dissatisfied",
      "sentiment_dissatisfied",
      "sentiment_neutral",
      "sentiment_satisfied",
      "sentiment_very_satisfied"]
  }

  public getProductsByCategory(nameCategory: string): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();

    let options = new RequestOptions({ headers: headers });

    let catalogRequest = new CatalogRequest(false, null, false, nameCategory, null, null);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }


  public getProductsByRangePrice(initialRangePrice: number, finalRangePrice: number): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();

    let options = new RequestOptions({ headers: headers });

    let catalogRequest = new CatalogRequest(false ,null, false, null, initialRangePrice, finalRangePrice);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByAvailability(availability: boolean): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();

    let options = new RequestOptions({ headers: headers });

    let catalogRequest = new CatalogRequest(false, null, availability, null, null, null);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByTopProduct(countProduct: number): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let catalogRequest = new CatalogRequest(false, countProduct, false, null, null, null);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProducts(): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let catalogRequest = new CatalogRequest(true, null, false, null, null, null);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public reserveProducts(products: Product[]): Observable<Product[]> {

    let headers = this.securityService.validateTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let productsSearch = this.convertProductToProductSearch(products);

    let reserveRequestPayload = new ReserveRequestPayload(productsSearch);
    let reserveRequest = new ReserveRequest(reserveRequestPayload);

    return this._http
      .post(environment.URLCatalog + environment.endPointReserveProduct, reserveRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByCategoryMock(nameCategory: string): Observable<Product[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this._httpClient
      .get(this.url + nameCategory + '-products.json', {
        headers: httpHeaders,
      })
      .pipe(
        map(((response: any) => {
          console.log(response);
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }

          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByRangePriceMock(initialRangePrice: number, finalRangePrice: number): Observable<Product[]> {

    return this._httpClient
      .get(this.url + initialRangePrice + '-products.json')
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }

          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByAvailabilityMock(availability: boolean): Observable<Product[]> {

    return this._httpClient
      .get(this.url + availability + '-products.json')
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }

          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsByTopProductMock(countProduct: number): Observable<Product[]> {

    return this._httpClient
      .get(this.url + countProduct + '-products.json')
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }

          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductsMock(): Observable<Product[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this._httpClient
      .get(this.url + 'all-products.json', {
        headers: httpHeaders,
      })
      .pipe(
        map(((response: any) => {
          this.catalogResponse = response.responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }

          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public convertImages64BitToImagesArray(productDataArray: Product[]): Product[] {
    this.productArray = []
    productDataArray.forEach(element => {
      element.images = this.converteImage(element.images)
      this.productArray.push(element);
    });

    return this.productArray;
  }

  public convertImages64BitToImages(product: Product): Product {
    product.images = this.converteImage(product.images)
    return product;
  }

  public converteImage(images: Images64Bits[]): Images[] {
    this.images = []
    images.forEach(element => {
      this.images.push(new Images(
        this._sanitizer.bypassSecurityTrustResourceUrl(element.big),
        this._sanitizer.bypassSecurityTrustResourceUrl(element.medium),
        this._sanitizer.bypassSecurityTrustResourceUrl(element.small)))
    });
    return this.images;
  }

  public getProductById(id): Observable<Product> {
    return this._httpClient.get<Product>(this.url + 'product-' + id + '.json')
      .pipe(
        map(((response: any) => {
          this.productResponse = response.responsePayload;
          console.log(this.productResponse);
          if (this.productResponse.product) {
            this.product = this.productResponse.product;
          }
          return this.product;
        }),
          catchError((e: Response) => throwError(e)))
      );
  }

  public convertNumberToStringRating(product: Product, numerToString: boolean): Product{
    product.comments.forEach(element => {
      if (numerToString) { element.rating = this.rating[element.rating]; }
      else { element.rating = this.rating.indexOf(element.rating) }
    });
    return product;
  }

  public convertProductToProductSearch(productDataArray: Product[]): ProductSearch[] {
    this.productArray = []
    productDataArray.forEach(element => {
      let productSearch = new ProductSearch(element.id);
      this.productArray.push(element);
    });
    return this.productArray;
  }

}