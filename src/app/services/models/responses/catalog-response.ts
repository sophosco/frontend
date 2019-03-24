import { Product } from "../../../app.models";

export class CatalogResponse {

  constructor(public statusCode: string,
    public statusMessage: string,
    public products: Product[],
  ) {
  }

}
