const express = require('express');
const router = express.Router();

/* GET message page. */
router.post('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;