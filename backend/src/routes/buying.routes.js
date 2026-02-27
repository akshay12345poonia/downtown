const express = require('express');
const buyingController = require('../controllers/buying.controller');

const router = express.Router();

router
  .route('/')
  .get(buyingController.getBuyingInquiries)
  .post(buyingController.createBuyingInquiry);

router
  .route('/:id')
  .get(buyingController.getBuyingInquiry)
  .delete(buyingController.deleteBuyingInquiry);

module.exports = router;

