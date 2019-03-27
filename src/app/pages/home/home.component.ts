import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Nueva Colección', subtitle: 'No te la pierdas', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Colección de Verano', subtitle: 'Nueva temporada en oferta', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Nueva Colección', subtitle: 'No te la pierdas', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Colección de Verano', subtitle: 'Nueva temporada en oferta', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Nueva Colección', subtitle: 'No te la pierdas', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public products: Array<Product>;
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;


  constructor(public appService:AppService,
    public productService: ProductService) { }

  ngOnInit() {
    this.getBanners();
    this.getProductsByCategory("celulares");
    this.getBrands();
  }

  public onLinkClick(e){
    this.getProductsByCategory(e.tab.textLabel.toLowerCase());
  }

  public getProductsByCategory(nameCategory: string) {
    this.productService.getProductsByCategoryMock(nameCategory).subscribe(data => {
      this.products = data;
    });
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

}
