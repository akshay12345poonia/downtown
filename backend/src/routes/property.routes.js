const express = require('express');
const propertyController = require('../controllers/property.controller');

const router = express.Router();

router
  .route('/')
  .get(propertyController.getProperties)
  .post(propertyController.createProperty);

router
  .route('/:id')
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;

