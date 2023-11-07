import { findCategoryById } from "../models/categories/categoriesModels.js";
import { findOrderWithProduct } from "../models/orders/orderModels.js";
import {
  createProduct,
  findProductById,
  productUpdate,
  findAllProductsByCategory,
  findAllProducts,
  deleteProductById,
} from "../models/products/productsModels.js";

export async function registerProduct(req, res) {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    const category = await findCategoryById(categoria_id);
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    const product = await createProduct(
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    );

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function updateProduct(req, res) {
  try {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
    const { id } = req.params;

    const productExists = await findProductById(id);

    if (!productExists) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const category = await findCategoryById(categoria_id);
    if (!category) {
      return res.status(400).json({ message: "Category does not exist" });
    }

    const product = await productUpdate(
      id,
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    );

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function listAllProducts(req, res) {
  try {
    const { categoria_id } = req.query;

    if (categoria_id) {
      const categoriaIdAsInt = parseInt(categoria_id);

      if (
        isNaN(categoriaIdAsInt) ||
        categoriaIdAsInt !== parseFloat(categoria_id)
      ) {
        return res
          .status(400)
          .json({ message: "categoria_id must be an integer" });
      }

      const category = await findCategoryById(categoriaIdAsInt);
      if (!category) {
        return res.status(400).json({ message: "Category does not exist" });
      }

      const productsCategory = await findAllProductsByCategory(
        categoriaIdAsInt
      );
      return res.status(200).json({ productsCategory });
    }

    const products = await findAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function listProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await findProductById(id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const orderWithProduct = await findOrderWithProduct(id);
    if (orderWithProduct.length > 0) {
      return res.status(400).json({ message: "Product is in an order" });
    }

    await deleteProductById(id);
    return res.status(204).json({});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}
