const categoryConfig= require('../models/categoryConfig');
const Venue= require('../models/venue');
const Jewellery= require('../models/jewellery');
const Photographer= require('../models/photographer');
const VenueGallery= require('../models/venueGallery');

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

const createVenues= async (req, res) => {
    try {
        const { name, location, capacity, category } = req.body;
        const newVenue = new Venue({
            name,
            location,
            capacity,
            category
        });
        await newVenue.save();
        res.status(201).json({ data:{ venue: newVenue }, message: "Venue created successfully" });
    } catch (error) {
        console.error("Error creating venue:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getVenuesByCategoryId= async (req, res) => {
    try {
        const {  categoryName } = req.body;
        const category = await categoryConfig.find({
           category: { $regex: categoryName, $options: 'i' } 
        });

        console.log("Category found:", category);
        if(!category){
            return res.status(404).json({ message: "Category not found" });
        }
                    const venues = await Venue.aggregate([
                    {
                        $match: { category: category[0]._id }
                    },
                    {
                        $lookup: {
                        from: 'venuegalleries',
                        localField: '_id',
                        foreignField: 'venueId',
                        as: 'galleryImages'
                        }
                    },
                    {
                        $project: {
                        name: 1,
                        location: 1,
                        capacity: 1,
                        category: 1,
                        galleryImages: {
                            $map: {
                            input: "$galleryImages",
                            as: "img",
                            in: {
                                imageType: "$$img.imageType",
                                imageUrl: "$$img.imageUrl"
                            }
                            }
                        }
                        }
                    }
                    ]);


        if (venues.length === 0) {
            return res.status(404).json({ message: "No venues found for this category" });
        } else {
            return res.status(200).json({ data: { venues }, message: "Venues fetched successfully" });
        }
    
    } catch (error) {
        console.error("Error fetching venues:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getJewelleryByCategoryId= async (req, res) => {
    try {
        const {  categoryName } = req.body;
        const category = await categoryConfig.find({
           category: { $regex: categoryName, $options: 'i' } 
        });
        console.log("Category found:", category);
        if(!category){
            return res.status(404).json({ message: "Category not found" });
        }
        const jewelleryItems = await Jewellery.find({ category: category[0]._id });
        if (jewelleryItems.length === 0) {
            return res.status(404).json({ message: "No jewellery found for this category" });
        }
        return res.status(200).json({ data: { jewelleryItems }, message: "Jewellery fetched successfully" });
    } catch (error) {
        console.error("Error fetching jewellery:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createJewellery= async (req, res) => {
    try {
        const { name, material, category } = req.body;
        const newJewellery = new Jewellery({
            name,
            material,
            category
        });
        await newJewellery.save();
        res.status(201).json({ data:{ jewellery: newJewellery }, message: "Jewellery created successfully" });
    } catch (error) {
        console.error("Error creating jewellery:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createPhotographer= async (req, res) => {
    try {
        const { name, experience, cameraBrand, category } = req.body;
        const newPhotographer = new Photographer({
            name,
            experience,
            cameraBrand,
            category
        });
        await newPhotographer.save();
        res.status(201).json({ data:{ photographer: newPhotographer }, message: "Photographer created successfully" });
    } catch (error) {
        console.error("Error creating photographer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const uploadVenueImage= async (req, res) => {
    try {  
        const { venueId,imageType } = req.body;
        const image = req.file ? `/venue_images/${req.file.filename}` : '';
        const venue = await Venue.findById(venueId);
        if (!venue) {
            return res.status(404).json({ message: "Venue not found" });
        }
        const newGalleryImage = new VenueGallery({
            venueId: venue._id,
            imageUrl: image,
            imageType: imageType || 'gallery'
        });
        await newGalleryImage.save();
        res.status(201).json({ data: { image: newGalleryImage }, message: "Venue image uploaded successfully" });
    } catch (error) {
        console.error("Error uploading venue image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    // Implementation for uploading venue image
}

module.exports= { 
    createCategoryConfig, 
    getAllCategoryConfigs,
     createVenues, 
     createJewellery, 
     createPhotographer,
      getVenuesByCategoryId,
       getJewelleryByCategoryId,
        uploadVenueImage
    };