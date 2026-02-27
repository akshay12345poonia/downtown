const express = require('express');
const contactController = require('../controllers/contact.controller');

const router = express.Router();

router
  .route('/')
  .get(contactController.getContacts)
  .post(contactController.createContact);

router
  .route('/:id')
  .get(contactController.getContact)
  .delete(contactController.deleteContact);

module.exports = router;

