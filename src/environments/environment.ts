// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLAmazon: "https://sophosstore.net/callback",
  URLAmazonDev: "http://localhost:4200/callback",
  URLCatalog: "https://iofb7ey9ig.execute-api.us-east-2.amazonaws.com",
  URLSecurity: "https://mdqv65vxdd.execute-api.us-east-2.amazonaws.com",
  URLCard: "https://gz3pccmad9.execute-api.us-east-2.amazonaws.com",
  URLOrder: "https://47av2kc0ya.execute-api.us-east-2.amazonaws.com",
  URLPayment: "https://7dfcrahihj.execute-api.us-east-2.amazonaws.com",
  endPointCatalog: "/prod/api/products/catalog/",
  endPointDetailProduc: "/prod/api/products/product/",
  endPointReserveProduct: "/prod/api/products/reserve/",
  endPointGenerateToken: "/prod/services/security/getJwtToken/",
  endPointVerifyToken: "/prod/services/security/verifyJwtToken/",
  endPointUpdateCart: "/prod/gestioncarrito/updatecart/",
  endPointGetCart: "/prod/gestioncarrito/getcart/",
  endPointGetPayment: "/prd/api/payment/add",
  endPointGetOrder: "/prd/api/orden/add",
};
