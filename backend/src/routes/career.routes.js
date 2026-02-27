const express = require('express');
const careerController = require('../controllers/career.controller');

const router = express.Router();

router.route('/').get(careerController.getCareers).post(careerController.createCareer);

router
  .route('/:id')
  .get(careerController.getCareer)
  .patch(careerController.updateCareer)
  .delete(careerController.deleteCareer);

module.exports = router;

