/**
 * Created by sbv23 on 28/11/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body.msg);
    res.send('se envio mensaje');
    var msg = req.body.msg;

});

module.exports = router;