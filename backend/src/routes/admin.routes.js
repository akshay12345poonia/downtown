const express = require('express');
const adminController = require('../controllers/admin.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes here should be protected and restricted to admin
router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', adminController.getAdminStats);

module.exports = router;
