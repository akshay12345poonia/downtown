const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { uploadAvatar } = require('../middleware/upload.middleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Password reset
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Profile routes (protected)
router.get('/me', protect, authController.getMe);
router.patch('/updateMe', protect, uploadAvatar, authController.updateMe);

module.exports = router;