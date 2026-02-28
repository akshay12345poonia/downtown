const express = require('express');
const meetingController = require('../controllers/meeting.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// Public booking; admin/agents manage the schedule
router.route('/').get(protect, restrictTo('admin', 'agent'), meetingController.getMeetings).post(meetingController.createMeeting);

router
  .route('/:id')
  .get(protect, restrictTo('admin', 'agent'), meetingController.getMeeting)
  .patch(protect, restrictTo('admin', 'agent'), meetingController.updateMeeting)
  .delete(protect, restrictTo('admin', 'agent'), meetingController.deleteMeeting);

module.exports = router;

