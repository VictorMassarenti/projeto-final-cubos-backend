import {
  createNewClient,
  findAllClients,
  findClientByCpf,
  findClientByEmail,
  findClientById,
  updateNewClient,
} from "../models/clients/clientsModels.js";

export async function createClient(req, res) {
  try {
    const { nome, email, cpf, ...others } = req.body;

    const emailExists = await findClientByEmail(email);
    const cpfExists = await findClientByCpf(cpf);
    if (emailExists || cpfExists) {
      return res.status(400).json({ message: "Email or CPF already exists" });
    }

    const newClient = await createNewClient(nome, email, cpf, others);

    return res.status(201).json(newClient);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function listAllClients(req, res) {
  try {
    const allClients = await findAllClients();

    return res.status(200).json(allClients);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateClient(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, cpf, ...others } = req.body;

    const emailExists = await findClientByEmail(email);
    const cpfExists = await findClientByCpf(cpf);

    if (emailExists || cpfExists) {
      const client = await findClientById(id);
      if (client.email !== email || client.cpf !== cpf) {
        return res.status(400).json({ message: "Email or CPF already exists" });
      }
    }

    const updatedCliente = await updateNewClient(id, nome, email, cpf, others);
    return res.status(200).json(updatedCliente);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getClient(req, res) {
  try {
    const { id } = req.params;

    const client = await findClientById(id);

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
