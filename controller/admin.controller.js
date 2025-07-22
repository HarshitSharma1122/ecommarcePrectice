const Category = require("../schema/category.schema");
const Products=require("../schema/product.schema")

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const checkCategoryExist = await Category.findOne({ name });

    if (checkCategoryExist) {
      return res.status(409).json({
        success: false,
        msg: "category already exist",
      });
    }
    const newCategory = new Category({ name, description });

    await newCategory.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const addProducts = async (req, res) => {
  const { title, description, price, image, category, stock } = req.body;
  try {
    if (!title || !price || !category) {
      return res.status(400).json({
        success: false,
        msg: "Title, price, and category are required",
      });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        msg: "Category not found",
      });
    }

    const newProduct = new Products({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      msg: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = { addCategory, addProducts };
