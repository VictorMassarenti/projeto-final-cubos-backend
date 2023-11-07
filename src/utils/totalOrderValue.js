import { findProductById } from "../models/products/productsModels.js";

export async function totalOrderValue(pedido_produtos) {
  let valor_total = 0;
  for (const produto of pedido_produtos) {
    const product = await findProductById(produto.produto_id);
    valor_total += product.valor * produto.quantidade_produto;
  }

  return valor_total;
}
