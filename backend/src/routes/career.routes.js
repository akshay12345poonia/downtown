const express = require('express');
const careerController = require('../controllers/career.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/').get(careerController.getCareers).post(protect, restrictTo('admin'), careerController.createCareer);

router
  .route('/:id')
  .get(careerController.getCareer)
  .patch(protect, restrictTo('admin'), careerController.updateCareer)
  .delete(protect, restrictTo('admin'), careerController.deleteCareer);

module.exports = router;

