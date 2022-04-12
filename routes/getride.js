var express = require('express');
var router = express.Router();
var query1 = require("../controllers/controller.js");
router.post('/', query1.getRides);

module.exports = router;