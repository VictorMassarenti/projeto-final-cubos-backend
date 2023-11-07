import transport from "../config/email.js";
import { findClientById } from "../models/clients/clientsModels.js";
import { checkStock } from "../utils/checkStock.js";
import { checkProductId } from "../utils/checkProductId.js";
import { duplicatedProductId } from "../utils/duplicatedProductId.js";
import { totalOrderValue } from "../utils/totalOrderValue.js";
import { findProductById } from "../models/products/productsModels.js";
import {
  createNewOrder,
  findOrdersByClientId,
  listAllOrders,
} from "../models/orders/orderModels.js";

export async function createOrder(req, res) {
  try {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    const client = await findClientById(cliente_id);
    if (!client) {
      return res.status(404).json({ menssage: "Client not found" });
    }

    const existsDuplicatedProductId = duplicatedProductId(pedido_produtos);
    if (existsDuplicatedProductId) {
      return res.status(400).json({ message: "Duplicated produto_id" });
    }

    // Check if the product id is an existing product
    const productIdExists = await checkProductId(pedido_produtos);
    if (!productIdExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the quantity of the ordered product is in stock
    const insufficientStock = await checkStock(pedido_produtos);
    if (insufficientStock) {
      return res.status(404).json({ message: "Insufficient stock for order" });
    }

    const valor_total = await totalOrderValue(pedido_produtos);

    const new_pedido_produtos = await Promise.all(
      pedido_produtos.map(async (produto) => {
        return {
          quantidade_produto: produto.quantidade_produto,
          valor_produto: (await findProductById(produto.produto_id)).valor,
          produto_id: produto.produto_id,
        };
      })
    );

    const pedido = {
      valor_total,
      observacao,
      cliente_id,
      pedido_produtos: new_pedido_produtos,
    };
    await createNewOrder(pedido);

    transport.sendMail({
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: `${client.nome} <victormassarenti@gmail.com>`,
      subject: "Pedido realizado com sucesso",
      html: `<p>Olá, ${client.nome}! Seu pedido foi registrado com sucesso.</p>`,
    });

    return res.status(201).json({ message: "Order created" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function listOrder(req, res) {
  try {
    const { cliente_id } = req.query;

    if (cliente_id) {
      if (isNaN(parseInt(cliente_id))) {
        return res
          .status(400)
          .json({ message: "Invalid client_id number expected" });
      }
      const uniqueOrder = await findOrdersByClientId(cliente_id);
      return res.status(200).json(uniqueOrder);
    }

    const orders = await listAllOrders();

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
