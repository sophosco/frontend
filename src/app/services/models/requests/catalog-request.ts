export class CatalogRequest {

  constructor(public CountProduct: number,
    public Availability: boolean,
    public NameCategory: String,
    public InitialRangePrice: number,
    public FinalRangePrice: number
  ) {
  }

}
