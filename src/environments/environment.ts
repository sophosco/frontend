// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URLService:"http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3010",
  URLCatalog:"https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:8443",
  URLLogin:"https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
  URLSecurity:"https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
  URLCard:"https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
  endPointLogin:"/api/users/login/",
  endPointCatalog:"/api/products/catalog/",
  endPointDetailProduc:"/api/products/product/",
  endPointReserveProduct:"/api/products/catalog/",
  endPointGenerateToken:"/services/security/getJwtToken/",
  endPointVerifyToken:"/services/security/verifyJwtToken/",
  endPointUpdateCart:"/gestioncarrito/updatecart",
  endPointGetCart:"/gestioncarrito/getcart"
};
