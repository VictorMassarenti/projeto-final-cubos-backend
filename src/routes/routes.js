import express from "express";

// Middlewares
import validateReqBody from "../middlewares/validateReqBody.js";
import { tokenVerify } from "../middlewares/authentication.js";
import validateRouteParams from "../middlewares/validateRouteParams.js";
import schemaCreateUser from "../validations/schemaCreateUser.js";
import schemaUserLogin from "../validations/schemaUserLogin.js";
import {
  registerUser,
  getUser,
  login,
  updateUser,
} from "../controllers/UsersController.js";
import { listAllCategories } from "../controllers/CategoriesController.js";
import {
  registerProduct,
  updateProduct,
  listAllProducts,
  listProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import schemaProduct from "../validations/routeParams/schemaProduct.js";
import {
  createClient,
  getClient,
  listAllClients,
  updateClient,
} from "../controllers/ClientController.js";
import schemaCreateClient from "../validations/schemaCreateClient.js";
import schemaClient from "../validations/routeParams/schemaClient.js";
import schemaOrder from "../validations/schemaOrder.js";
import { createOrder, listOrder } from "../controllers/OrderController.js";

const router = express.Router();

router.get("/", (req, res) => {
  return res.status(200).json("Main OK");
});

router.post("/usuario", validateReqBody(schemaCreateUser), registerUser);
router.post("/login", validateReqBody(schemaUserLogin), login);
router.get("/categoria", listAllCategories);

router.use(tokenVerify);

router.get("/usuario", getUser);
router.put("/usuario", validateReqBody(schemaCreateUser), updateUser);

router.post("/produto", registerProduct);
router.put("/produto/:id", validateRouteParams(schemaProduct), updateProduct);
router.get("/produto", listAllProducts);
router.get("/produto/:id", validateRouteParams(schemaProduct), listProduct);
router.delete(
  "/produto/:id",
  validateRouteParams(schemaProduct),
  deleteProduct
);

router.post("/cliente", validateReqBody(schemaCreateClient), createClient);
router.get("/cliente", listAllClients);
router.get("/cliente/:id", validateRouteParams(schemaClient), getClient);
router.put(
  "/cliente/:id",
  validateRouteParams(schemaClient),
  validateReqBody(schemaCreateClient),
  updateClient
);

router.post("/pedido", validateReqBody(schemaOrder), createOrder);
router.get("/pedido", listOrder);

export default router;
