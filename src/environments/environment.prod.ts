export const environment = {
  production: true,
  URLCatalog: "http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3010",
  URLLogin: "https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
  URLSecurity: "http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3000",
  URLCard: "http://SBBOGLAPPROJO7.sophos.col.com:18080",
  URLOrder: "https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
  URLPayment: "https://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:9443",
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
