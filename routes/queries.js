var express = require('express');
var router = express.Router();
var query1 = require("../controllers/controller.js");
router.post('/', query1.login2);
//router.post('/2', query1.paySignUp);
module.exports = router;