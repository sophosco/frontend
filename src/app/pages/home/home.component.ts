import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { ProductService } from '../../services/product.service';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Nuevos Celulares', subtitle: 'Nuevos dispositivos', category: 'CELULARES', image: 'assets/images/carousel/banner1.jpeg' },
    { title: 'Nuevos Accesorios', subtitle: 'Nueva temporada en oferta', category: 'ACCESORIOS', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Nuevos Audios', subtitle: 'No te la pierdas', category: 'AUDIO', image: 'assets/images/carousel/banner3.jpg' }
  ];

  public brands = [];
  public banners = [];
  public products: Array<Product>;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;


  constructor(public appService: AppService,
    public securityService: SecurityService,
    public productService: ProductService) { }

  ngOnInit() {
    //this.validateTokenSecurity();
    this.getBanners();
    this.getProductsByCategory("celulares");
    this.getBrands();
  }

  public onLinkClick(e) {
    this.getProductsByCategory(e.tab.textLabel.toLowerCase());
  }

  public validateTokenSecurity() {
    this.securityService.verificateToken().subscribe(data => {
      console.log(data);
    });
  }

  public getProductsByCategory(nameCategory: string) {

    let validateToken = this.securityService.validateTokenBySessionUser();
    if (validateToken) {

      this.productService.getProductsByCategory(nameCategory).subscribe(data => {
        data = this.productService.convertImages64BitToImagesArray(data);
        this.products = data;
      });

    } else {

      this.securityService.getTokenAuthentication("1").subscribe(tokenData => {
        this.productService.getProductsByCategory(nameCategory).subscribe(data => {
          data = this.productService.convertImages64BitToImagesArray(data);
          this.products = data;
        });
      });

    }

  }

  public getBanners() {
    this.appService.getBanners().subscribe(data => {
      this.banners = data;
    })
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
  }

}
