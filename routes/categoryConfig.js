const categoryController = require('./../controllers/categoryConfig');
const express = require('express');
const router = express.Router();
const category_thumbnails = require('../middleware/uploadMidleWare');
router.post('/add-category', category_thumbnails.single('image'), categoryController.createCategoryConfig);
router.get('/categories', categoryController.getAllCategoryConfigs);
module.exports = router;