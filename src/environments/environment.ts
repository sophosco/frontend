// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLCatalog: "https://ab13b1006538611e9ba830a1db711ca4-631194424.us-east-2.elb.amazonaws.com",
  URLLogin: "https://a509c9b1d537311e9a81b0666116d3a5-342058073.us-east-2.elb.amazonaws.com",
  URLSecurity: "httpss://aaa01c7ec542511e9a81b0666116d3a5-63920683.us-east-2.elb.amazonaws.com",
  URLCard: "https://a4997aa3e537811e9a81b0666116d3a5-931031808.us-east-2.elb.amazonaws.com",
  URLOrder: "https://acabea643537511e9a81b0666116d3a5-432135908.us-east-2.elb.amazonaws.com",
  URLPayment: "https://adb958412537911e9ba830a1db711ca4-1645037395.us-east-2.elb.amazonaws.com",
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
