const categoryConfig= require('../models/categoryConfig');

// Create a new category configuration
const createCategoryConfig= async (req, res) => {
    try {
        const { category, location, description } = req.body;
        const image = req.file ? `/category_thumbnails/${req.file.filename}` : '';
        const newCategory = new categoryConfig({
            category,
            location,
            description,
            imageUrl: image
        });
        await newCategory.save();
        res.status(201).json({ data:{ category: newCategory }, message: "Category configuration created successfully" });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Get all category configurations
const getAllCategoryConfigs= async (req, res) => {
    try {
        const categories = await categoryConfig.find();
        if(categories.length === 0){
          res.status(200).json({ data: [], message: "Category configurations fetched successfully" });
        } else {
            const mappedCategories = categories.map((cat) => ({
                category: cat.category,
                location: cat.location,
                description: cat.description,
                categoryId: cat._id,
                imageUrl: `http://localhost:8080${cat.imageUrl}`
            })
            )
          res.status(200).json({ data: { categories: mappedCategories }, message: "Category configurations fetched successfully" });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports= { createCategoryConfig, getAllCategoryConfigs };