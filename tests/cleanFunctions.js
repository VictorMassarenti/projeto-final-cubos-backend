const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cleanUpUsers() {
  await prisma.usuarios.deleteMany({
    where: {
      email: "test@example.com",
    },
  });
  await prisma.usuarios.deleteMany({
    where: {
      email: "test2@example.com",
    },
  });
}

async function cleanUpClients() {
  await prisma.clientes.deleteMany({
    where: {
      email: "cliente2@example.com",
    },
  });
}

module.exports = {
  cleanUpUsers,
  cleanUpClients,
};
