import findAllCategories from "../models/categories/categoriesModels.js";

export async function listAllCategories(req, res) {
  try {
    const categories = await findAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
