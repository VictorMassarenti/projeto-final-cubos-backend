import { findProductById } from "../../models/products/productsModels.js";

const schemaProduct = {
  validateAsync: async (params) => {
    const { id } = params;
    const idAsFloat = parseFloat(id);

    if (!Number.isInteger(idAsFloat)) throw new Error("Id must be an integer");

    const idExists = await findProductById(idAsFloat);
    if (!idExists) throw new Error("Id not found");
  },
};

export default schemaProduct;
