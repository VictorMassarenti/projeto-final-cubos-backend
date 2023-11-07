import prisma from "../../config/prisma.js";

export async function findUserByEmail(email) {
  try {
    const userValited = await prisma.usuarios.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
      },
    });
    return userValited;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUser(nome, email, passwordEncrypt) {
  try {
    const user = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: passwordEncrypt,
      },
    });

    return user;
  } catch (error) {
    return undefined;
  }
}

export async function userUpdate(id, nome, email, senha) {
  try {
    const user = await prisma.usuarios.update({
      where: {
        id,
      },
      data: {
        nome,
        email,
        senha,
      },
    });

    return user;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findUserById(id) {
  try {
    const user = await prisma.usuarios.findUnique({
      where: {
        id,
      },
    });

    const { senha, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error " });
  }
}
