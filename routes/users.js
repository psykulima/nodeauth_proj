var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});

var User= require('../models/user');

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


/* POST users Register page. */
router.post('/register', upload.single('profileimage'), function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    if(req.file){
        console.log('uploading file...');
        var profileimage = req.file.filename;
    }else {
        console.log('no file upload..');
        var profileimage = 'noimage.jpg';
    }
    
    //Form Validator
    req.checkBody('name','Name field is required').notEmpty();
    req.checkBody('email','Email field is required').notEmpty();
    req.checkBody('email','Email not valid').isEmail();
    req.checkBody('username','Username field is required').notEmpty();
    req.checkBody('password','Password field is required').notEmpty();
    req.checkBody('password2','Password do not match').equals(req.body.password);
    
    //Check Error
    var errors = req.validationErrors();
    if(errors){
        console.log('errors');
        res.render('register',{
            errors:errors
        });
    }else{
        console.log('no errors');
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileimage: profileimage
        });
        
        User.createUser(newUser, function(err,user){
            if(err)throw err;
            console.log(user);
        });
        
        res.location('/');
        res.redirect('/');
    }
});




/* GET users Logout page. 
router.get('/logout', function(req, res, next) {
  res.render('logout', {title:'Logout'});
});
*/

module.exports = router;
