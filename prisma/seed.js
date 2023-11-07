import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  await prisma.categorias.createMany({
    data: [
      { descricao: "Informática" },
      { descricao: "Celulares" },
      { descricao: "Beleza e Perfumaria" },
      { descricao: "Mercado" },
      { descricao: "Livros e Papelaria" },
      { descricao: "Brinquedos" },
      { descricao: "Moda" },
      { descricao: "Bebê" },
      { descricao: "Games" },
    ],
  });

  await prisma.usuarios.create({
    data: {
      nome: "Test User",
      email: "test@user.com",
      senha: await bcrypt.hash("123456", 10),
    },
  });

  await prisma.produtos.create({
    data: {
      descricao: "Produto de teste",
      quantidade_estoque: 1,
      valor: 1000,
      categoria_id: 1,
    },
  });

  await prisma.clientes.create({
    data: {
      nome: "Cliente de teste",
      email: "cliente@example.com",
      cpf: "12345678910",
      cep: "12345678",
      rua: "Rua de teste",
      numero: "123",
      bairro: "Bairro de teste",
      cidade: "Cidade de teste",
      estado: "Estado de teste",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
