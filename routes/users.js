var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users Register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

/* GET users Login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});


/* GET users Register page. */
router.post('/register', upload.single('profileimage'), function(req, res, next) {
  console.log(req.body.email);
});




/* GET users Logout page. 
router.get('/logout', function(req, res, next) {
  res.render('logout', {title:'Logout'});
});
*/

module.exports = router;
