var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

router.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

module.exports = router;
