// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLAmazon: "https://aea870a0c542b11e9a81b0666116d3a5-1698459416.us-east-2.elb.amazonaws.com/callback",
  URLAmazonDev: "http://localhost:4200/callback",
  URLCatalog: "https://iofb7ey9ig.execute-api.us-east-2.amazonaws.com",
  URLLogin: "https://a509c9b1d537311e9a81b0666116d3a5-342058073.us-east-2.elb.amazonaws.com",
  URLSecurity: "https://mdqv65vxdd.execute-api.us-east-2.amazonaws.com",
  URLCard: "https://gz3pccmad9.execute-api.us-east-2.amazonaws.com",
  URLOrder: "https://47av2kc0ya.execute-api.us-east-2.amazonaws.com",
  URLPayment: "https://7dfcrahihj.execute-api.us-east-2.amazonaws.com",
  endPointLogin: "/api/users/login/",
  endPointCatalog: "/prod/api/products/catalog/",
  endPointDetailProduc: "/prod/api/products/product/",
  endPointReserveProduct: "/prod/api/products/reserve/",
  endPointGenerateToken: "/prod/services/security/getJwtToken/",
  endPointVerifyToken: "/services/security/verifyJwtToken/",
  endPointUpdateCart: "/prod/gestioncarrito/updatecart/",
  endPointGetCart: "/prod/gestioncarrito/getcart/",
  endPointGetPayment: "/prd/api/payment/addPago/",
  endPointGetOrder: "/prd/api/orden/add/",
};
