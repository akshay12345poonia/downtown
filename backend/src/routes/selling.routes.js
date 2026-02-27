const express = require('express');
const sellingController = require('../controllers/selling.controller');

const router = express.Router();

router
  .route('/')
  .get(sellingController.getSellingInquiries)
  .post(sellingController.createSellingInquiry);

router
  .route('/:id')
  .get(sellingController.getSellingInquiry)
  .delete(sellingController.deleteSellingInquiry);

module.exports = router;

