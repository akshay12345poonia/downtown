const express = require('express');
const investorController = require('../controllers/investor.controller');

const router = express.Router();

router
  .route('/')
  .get(investorController.getInvestors)
  .post(investorController.createInvestor);

router
  .route('/:id')
  .get(investorController.getInvestor)
  .delete(investorController.deleteInvestor);

module.exports = router;

