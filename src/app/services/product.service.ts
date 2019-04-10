import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from "@angular/http";
import { ProductResponse } from "./models/responses/product-response";
import { CatalogResponse } from "./models/responses/catalog-response";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { environment } from '../../environments/environment';
import { Product, Images, Images64Bits } from '.././app.models';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogRequest, RequestPayloadCatalog, RequestHeaderCatalog } from './models/requests/catalog-request';
import { SecurityService } from './security.service';
import { ReserveRequest, ReserveRequestPayload, ProductSearch } from './models/requests/reserve-request';
import { RequestHeaderProduct, RequestPayloadProduct, ProductRequest } from './models/requests/product-request';

@Injectable()
export class ProductService {

  private catalogResponse: CatalogResponse;
  private productList: Product[];
  private product: Product;
  private productResponse: ProductResponse;
  private productArray: Product[]
  private images: Images[];
  private rating: String[];

  constructor(private securityService: SecurityService, private _http: Http, private _sanitizer: DomSanitizer) {
    this.rating = [
      "sentiment_very_dissatisfied",
      "sentiment_dissatisfied",
      "sentiment_neutral",
      "sentiment_satisfied",
      "sentiment_very_satisfied"]
  }


  public getProductsByCategory(nameCategory: string): Observable<Product[]> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderCatalog = new RequestHeaderCatalog(headers.get("X-Session"), '1');
    let requesPayloadCatalog = new RequestPayloadCatalog(false, null, false, nameCategory.toUpperCase(), null, null);
    let catalogRequest = new CatalogRequest(requestHeaderCatalog, requesPayloadCatalog);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = JSON.parse(response._body).responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

 
  public getProductsByRangePrice(initialRangePrice: number, finalRangePrice: number): Observable<Product[]> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderCatalog = new RequestHeaderCatalog(headers.get("X-Session"), '1');
    let requesPayloadCatalog = new RequestPayloadCatalog(false, null, false, null, initialRangePrice, finalRangePrice);
    let catalogRequest = new CatalogRequest(requestHeaderCatalog, requesPayloadCatalog);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = JSON.parse(response._body).responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }


  public getProductsByAvailability(availability: boolean): Observable<Product[]> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderCatalog = new RequestHeaderCatalog(headers.get("X-Session"), '1');
    let requesPayloadCatalog = new RequestPayloadCatalog(false, null, availability, null, null, null);
    let catalogRequest = new CatalogRequest(requestHeaderCatalog, requesPayloadCatalog);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = JSON.parse(response._body).responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

 
  public getProductsByTopProduct(countProduct: number): Observable<Product[]> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderCatalog = new RequestHeaderCatalog(headers.get("X-Session"), '1');
    let requesPayloadCatalog = new RequestPayloadCatalog(false, countProduct, false, null, null, null);
    let catalogRequest = new CatalogRequest(requestHeaderCatalog, requesPayloadCatalog);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = JSON.parse(response._body).responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }


  public getProducts(): Observable<Product[]> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderCatalog = new RequestHeaderCatalog(headers.get("X-Session"), '1');
    let requesPayloadCatalog = new RequestPayloadCatalog(true, null, false, null, null, null);
    let catalogRequest = new CatalogRequest(requestHeaderCatalog, requesPayloadCatalog);

    return this._http
      .post(environment.URLCatalog + environment.endPointCatalog, catalogRequest, options)
      .pipe(
        map(((response: any) => {
          this.catalogResponse = JSON.parse(response._body).responsePayload;
          if (this.catalogResponse.products.length > 0) {
            this.productList = this.catalogResponse.products;
          }
          return this.productList;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public getProductById(id): Observable<Product> {
    
    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let requestHeaderProduct = new RequestHeaderProduct(headers.get("X-Session"), '1');
    let requesPayloadProduct = new RequestPayloadProduct(id);
    let productRequest = new ProductRequest(requestHeaderProduct, requesPayloadProduct);

    return this._http
      .post(environment.URLCatalog + environment.endPointDetailProduc, productRequest, options)
      .pipe(
        map(((response: any) => {
          this.productResponse = JSON.parse(response._body).responsePayload;
          if (this.productResponse.product !== undefined || this.productResponse.product != null) {
            this.product = this.productResponse.product;
          }
          return this.product;
        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public reserveProducts(products: Product[]): Observable<string> {

    let headers = this.securityService.getHeaderTokenBySession();
    let options = new RequestOptions({ headers: headers });

    let productsSearch = this.convertProductToProductSearch(products);
    let reserveRequestPayload = new ReserveRequestPayload(productsSearch);
    let reserveRequest = new ReserveRequest(reserveRequestPayload);

    return this._http
      .post(environment.URLCatalog + environment.endPointReserveProduct, reserveRequest, options)
      .pipe(
        map(((response: any) => {
          return JSON.parse(response._body).responseHeader.status.description;

        }),
          catchError((e: Response) => throwError(e)))
      );

  }

  public convertImages64BitToImagesArray(productDataArray: Product[]): Product[] {
    this.productArray = []

    if (productDataArray !== undefined || productDataArray != null) {
      productDataArray.forEach(element => {
        element.images = this.converteImage(element.images)
        this.productArray.push(element);
      });
    }

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



  public convertNumberToStringRating(product: Product, numerToString: boolean): Product {
    product.comments.forEach(element => {
      if (numerToString) { element.rating = this.rating[element.rating]; }
      else { element.rating = this.rating.indexOf(element.rating) }
    });
    return product;
  }

  public convertProductToProductSearch(products: Product[]): ProductSearch[] {
    let productsSearch: ProductSearch[]=[];
    products.forEach(element => {
      productsSearch.push(new ProductSearch(element.id, element.name, String(element.availibilityCount), true));
    });
    return productsSearch;
  }

}