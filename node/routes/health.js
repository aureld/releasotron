const router = require('express').Router();

router.get('/', (req, res, next) => {
  return res.json({
    healthy: false
  });
});

module.exports = router;