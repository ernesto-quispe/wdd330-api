const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router.get('/random', questionController.getQuestion);

module.exports = router;