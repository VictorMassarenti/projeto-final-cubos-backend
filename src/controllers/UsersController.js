import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
  userUpdate,
} from "../models/users/usersModels.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.SECRET;

export async function registerUser(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const emailExists = await findUserByEmail(email);

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Invalid email for registration." });
    }

    const passwordEncrypt = await bcrypt.hash(senha, 10);
    const user = await createUser(nome, email, passwordEncrypt);

    const { senha: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const passwordEncrypt = await bcrypt.compare(senha, user.senha);

    if (!passwordEncrypt) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const id = { userId: user.id };
    const token = jwt.sign(id, SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const id = req.user;

    const emailExists = await findUserByEmail(email);
    if (emailExists) {
      const user = await findUserById(id);
      if (user.email !== email) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const hash = await bcrypt.hash(senha, 10);

    const user = await userUpdate(id, nome, email, hash);
    const { senha: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUser(req, res) {
  try {
    const id = req.user;

    const userWithoutPassword = await findUserById(id);

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
