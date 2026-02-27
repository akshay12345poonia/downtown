const express = require('express');
const agentController = require('../controllers/agent.controller');

const router = express.Router();

router.route('/').get(agentController.getAgents).post(agentController.createAgent);

router
  .route('/:id')
  .get(agentController.getAgent)
  .patch(agentController.updateAgent)
  .delete(agentController.deleteAgent);

module.exports = router;

