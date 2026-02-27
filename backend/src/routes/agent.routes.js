const express = require('express');
const agentController = require('../controllers/agent.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/').get(agentController.getAgents).post(protect, restrictTo('admin'), agentController.createAgent);

router
  .route('/:id')
  .get(agentController.getAgent)
  .patch(protect, restrictTo('admin'), agentController.updateAgent)
  .delete(protect, restrictTo('admin'), agentController.deleteAgent);

module.exports = router;

