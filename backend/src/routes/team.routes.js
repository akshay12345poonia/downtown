const express = require('express');
const teamController = require('../controllers/team.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(teamController.getTeam)
  .post(protect, restrictTo('admin'), teamController.createTeamMember);

router
  .route('/:id')
  .get(teamController.getTeamMember)
  .patch(protect, restrictTo('admin'), teamController.updateTeamMember)
  .delete(protect, restrictTo('admin'), teamController.deleteTeamMember);

module.exports = router;

