import prisma from "../../config/prisma.js";

export async function createProduct(
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) {
  try {
    const product = await prisma.produtos.create({
      data: {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      },
    });
    return product;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function productUpdate(
  id,
  descricao,
  quantidade_estoque,
  valor,
  categoria_id
) {
  try {
    const product = await prisma.produtos.update({
      where: {
        id: parseInt(id),
      },
      data: {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      },
    });
    return product;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findProductById(id) {
  try {
    const product = await prisma.produtos.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return product;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findAllProductsByCategory(categoria_id) {
  try {
    const products = await prisma.produtos.findMany({
      where: {
        categoria_id: parseInt(categoria_id),
      },
    });
    return products;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findAllProducts() {
  try {
    const products = await prisma.produtos.findMany({});
    return products;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteProductById(id) {
  try {
    const deleteProduct = await prisma.produtos.delete({
      where: {
        id: parseInt(id),
      }
    })
    return deleteProduct;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
