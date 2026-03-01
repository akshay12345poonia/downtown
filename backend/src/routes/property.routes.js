const express = require('express');
const propertyController = require('../controllers/property.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const { uploadPropertyImages } = require('../middleware/upload.middleware');

const router = express.Router();

router
  .route('/')
  .get(propertyController.getProperties)
  .post(protect, restrictTo('admin', 'seller', 'agent'), uploadPropertyImages, propertyController.createProperty);

router
  .route('/:id')
  .get(propertyController.getProperty)
  .patch(protect, restrictTo('admin', 'seller', 'agent'), uploadPropertyImages, propertyController.updateProperty)
  .delete(protect, restrictTo('admin', 'seller', 'agent'), propertyController.deleteProperty);

module.exports = router;
