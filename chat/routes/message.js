const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST API new message - storing to DB
router.post('/', function(req, res) {
     const message = new Message(req.body);
     message.save().then(msg => res.json(msg));
});

// GET API message list from DB
router.get('/', function(req, res) {
     Message.find().sort('-createdAt')
         .then(messages=> res.json(messages))
         .catch(err => console.error(err))
});

module.exports = router;