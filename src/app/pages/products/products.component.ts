import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public page: any;

  constructor(private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public productService: ProductService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategory(params['name']);
    });
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };

    this.getCategories();
    this.getBrands();

  }

  public getProductsByCategory(nameCategory: string) {
    this.productService.getProductsByCategoryMock(nameCategory).subscribe(data => {
      this.products = data;

    });
  }

  public getAllProducts() {
    this.appService.getProducts("featured").subscribe(data => {
      this.products = data;
      //for show more product  
      for (var index = 0; index < 3; index++) {
        this.products = this.products.concat(this.products);
      }
    });
  }

  public getCategories() {
    if (this.appService.Data.categories.length == 0) {
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else {
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getProductsByCategory(params['name']);
    });

  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public onPageChanged(event) {
    this.page = event;
    this.getAllProducts();
    window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
    }
  }

  public onChangeAvailability(event) {
    if (event.target) {
      console.log(event.target.innerText.toLowerCase());
    }
  }

}
