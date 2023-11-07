import { findClientById } from "../../models/clients/clientsModels.js";

const schemaClient = {
  validateAsync: async (params) => {
    const { id } = params;

    if (!id) throw new Error("Id is required");

    if (isNaN(parseInt(id))) throw new Error("Id must be a number");

    const idExists = await findClientById(id);
    if (!idExists) throw new Error("Id not found");
  },
};

export default schemaClient;
