var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    author: "Tirawian",
    working: true
  });
});

module.exports = router;
