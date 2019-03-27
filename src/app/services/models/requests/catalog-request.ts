export class CatalogRequest {

  constructor(public All: boolean,
    public CountProduct: number,
    public Availability: boolean,
    public NameCategory: String,
    public InitialRangePrice: number,
    public FinalRangePrice: number
  ) {
  }

}
