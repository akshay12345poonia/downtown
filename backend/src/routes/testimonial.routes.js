const express = require('express');
const testimonialController = require('../controllers/testimonial.controller');

const router = express.Router();

router
  .route('/')
  .get(testimonialController.getTestimonials)
  .post(testimonialController.createTestimonial);

router.route('/:id').delete(testimonialController.deleteTestimonial);

module.exports = router;

