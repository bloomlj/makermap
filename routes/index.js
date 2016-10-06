var express = require('express');
// Mongo connect
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

var router = express.Router();

var passportGithub = require('../auth/github');

// var mongoutils = require('./mongoutils.js');

// console.log(mongoutils.url);

// Use connect method to connect to the Server
// MongoClient.connect(global.mongodb_url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");
//   mongoutils.insertDocuments(db, function() {
//     mongoutils.updateDocument(db, function() {
//       mongoutils.deleteDocument(db, function() {
//         mongoutils.findDocuments(db, function() {
//           db.close();
//         });
//       });
//     });
//   });
// });



/* GET home page. */
router.get('/', function(req, res, next) {
  console.dir(req.user);
  res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res,next) {
    res.send('Go back and register!');
    //res.render('login', { user : req.user });
});

// router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

module.exports = router;
