import { findProductById } from "../models/products/productsModels.js";

export async function checkProductId(pedido_produtos) {
  let productIdNotFound = false;
  for (const pedido of pedido_produtos) {
    const verifyProduct = await findProductById(pedido.produto_id);
    if (verifyProduct == null) {
      productIdNotFound = true;
      break;
    }
  }

  if (productIdNotFound) {
    return false;
  } else {
    return true;
  }
}
