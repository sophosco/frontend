export const environment = {
  production: true,
  URLCatalog: process.env.API_BASE_CATALOG,
  URLLogin: process.env.API_BASE_LOGIN,
  URLSecurity: process.env.API_BASE_SECURITY,
  URLCard: process.env.API_BASE_CARD,
  URLOrder: process.env.API_BASE_ORDER,
  URLPayment: process.env.API_BASE_PAYMENT,
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
