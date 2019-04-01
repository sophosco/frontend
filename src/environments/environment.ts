// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLCatalog: "http://wsrestproducto:3010",
  URLLogin: "http://wsrestlogin:18080",
  URLSecurity: "http://wsrestsecurity:3000",
  URLCard: "http://wsrestgestioncarrito:18080",
  URLOrder: "http://wsrestorden:18080",
  URLPayment: "http://wsrestpago:18080",
  endPointLogin: "/api/users/login/",
  endPointCatalog: "/api/products/catalog/",
  endPointDetailProduc: "/api/products/product/",
  endPointReserveProduct: "/api/products/catalog/",
  endPointGenerateToken: "/services/security/getJwtToken/",
  endPointVerifyToken: "/services/security/verifyJwtToken/",
  endPointUpdateCart: "/gestioncarrito/updatecart/",
  endPointGetCart: "/gestioncarrito/getcart/",
  endPointGetPayment: "/api/payment/add",
  endPointGetOrder: "/api/orden/add"
};
