import { SafeResourceUrl } from '@angular/platform-browser';

export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class ProductData {
  constructor(public statusCode: string,
              public statusMessage: string,
              public product: Product){}
  }


export class Product {
  constructor(public id: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public availibilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number){ }
}

export class Images64Bits {
  constructor(public big: string,
              public medium: string,
              public small: string
              ){}
}

export class Images {
  constructor(public big: SafeResourceUrl,
              public medium: SafeResourceUrl,
              public small: SafeResourceUrl
              ){}
}