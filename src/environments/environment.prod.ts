export const environment = {
  production: true,
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
