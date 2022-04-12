var express = require('express');
var router = express.Router();
var query1 = require("../controllers/controller.js");
router.post('/', query1.confirmRides);

module.exports = router;