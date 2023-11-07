import prisma from "../../config/prisma.js";

export async function createNewOrder(pedido) {
  try {
    const newOrder = await prisma.pedidos.create({
      data: {
        valor_total: pedido.valor_total,
        observacao: pedido.observacao,
        cliente_id: pedido.cliente_id,
      },
    });

    await prisma.pedido_produtos.createMany({
      data: pedido.pedido_produtos.map((produto) => ({
        quantidade_produto: produto.quantidade_produto,
        valor_produto: produto.valor_produto,
        produto_id: produto.produto_id,
        pedido_id: newOrder.id,
      })),
    });

    const order = await prisma.pedidos.findUnique({
      where: {
        id: newOrder.id,
      },
      include: {
        pedido_produtos: true,
      },
    });

    return order;
  } catch (error) {
    console.log(error);
  }
}

export async function findOrdersByClientId(cliente_id) {
  try {
    const uniqueOrder = await prisma.pedidos.findMany({
      where: {
        cliente_id: parseInt(cliente_id),
      },
      include: {
        pedido_produtos: true,
      },
    });
    return uniqueOrder;
  } catch (error) {
    console.log(error);
  }
}

export async function listAllOrders() {
  try {
    const orders = await prisma.pedidos.findMany({
      include: {
        pedido_produtos: true,
      },
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
}

export async function findOrderWithProduct(id) {
  try {
    const order = await prisma.pedido_produtos.findMany({
      where: {
        produto_id: parseInt(id),
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}
