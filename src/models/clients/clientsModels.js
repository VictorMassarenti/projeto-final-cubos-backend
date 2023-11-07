import prisma from "../../config/prisma.js";

export async function findClientByEmail(email) {
  try {
    const client = await prisma.clientes.findUnique({
      where: {
        email,
      },
    });
    return client;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findClientByCpf(cpf) {
  try {
    const client = await prisma.clientes.findUnique({
      where: {
        cpf,
      },
    });
    return client;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNewClient(nome, email, cpf, others) {
  try {
    const newClient = await prisma.clientes.create({
      data: {
        nome,
        email,
        cpf,
        ...others,
      },
    });
    return newClient;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findAllClients() {
  try {
    const allClients = await prisma.clientes.findMany();
    return allClients;
    } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findClientById(id) {
  try {
    const client = await prisma.clientes.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return client;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNewClient(id, nome, email, cpf, others) {
  try {
    const updatedClient = await prisma.clientes.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
        email,
        cpf,
        ...others,
      },
    });
    return updatedClient;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
