export const environment = {
  production: true,
  URLCatalog: "http://localhost:3010",
  URLLogin: "https://localhost:9443",
  URLSecurity: "http://localhost:3000",
  URLCard: "http://localhost:18080",
  URLOrder: "https://localhost:9443",
  URLPayment: "https://localhost:9443",
  endPointLogin: "/api/users/login/",
  endPointCatalog: "/api/products/catalog/",
  endPointDetailProduc: "/api/products/product/",
  endPointReserveProduct: "/api/products/catalog/",
  endPointGenerateToken: "/services/security/getJwtToken/",
  endPointVerifyToken: "/services/security/verifyJwtToken/",
  endPointUpdateCart: "/gestioncarrito/updatecart",
  endPointGetCart: "/gestioncarrito/getcart",
  endPointGetPayment: "/api/payment/add",
  endPointGetOrder: "/api/orden/add"
};
