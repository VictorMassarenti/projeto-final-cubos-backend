import prisma from "../../config/prisma.js";

export default async function findAllCategories() {
  try {
    const categories = await prisma.categorias.findMany({
      select: {
        id: true,
        descricao: true,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function findCategoryById(id) {
  try {
    const category = await prisma.categorias.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return category;
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
