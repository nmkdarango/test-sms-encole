const express = require('express');
const { MessagesController } = require('../controllers');
const router = express.Router();

router.post('/sms', MessagesController.sendSMS);


module.exports= router;