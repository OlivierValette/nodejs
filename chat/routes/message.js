const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST message page
router.post('/', function(req, res, next) {
     const message = new Message(req.body);
     message.save().then(msg => res.json(msg));
});

// GET message page

module.exports = router;