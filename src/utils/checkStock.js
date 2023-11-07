import { findProductById } from "../models/products/productsModels.js";

export async function checkStock(pedido_produtos) {
  let insufficientStock = false;
  for (const pedido of pedido_produtos) {
    const product = await findProductById(pedido.produto_id);
    if (product.quantidade_estoque < pedido.quantidade_produto) {
      insufficientStock = true;
      break;
    }
  }
  if (insufficientStock) {
    return true;
  } else {
    return false;
  }
}
