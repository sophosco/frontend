import { Product } from "../../../app.models";

export class ProductResponse {

  constructor(public statusCode: string,
    public statusMessage: string,
    public products: Product[],
  ) {
  }

}
