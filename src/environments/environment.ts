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
  endPointCatalog: "/api/products/catalog/",
  endPointDetailProduc: "/api/products/product/",
  endPointReserveProduct: "/api/products/reserve/",
  endPointGenerateToken: "/services/security/getJwtToken/",
  endPointVerifyToken: "/services/security/verifyJwtToken/",
  endPointUpdateCart: "/gestioncarrito/updatecart/",
  endPointGetCart: "/gestioncarrito/getcart/",
  endPointGetPayment: "/api/payment/add",
  endPointGetOrder: "/api/orden/add",
};
