var router      = require('express').Router();

router.get('/', function(req, res) {
  res.redirect('/users');
});

module.exports = router;
