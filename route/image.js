var express = require('express');
var router = express.Router();


router.get('/image', function(req, res, next) {
  res.send('image');
  console.log('get image');
});

module.exports = router;