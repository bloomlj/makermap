var express = require('express');
// Mongo connect
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var router = express.Router();
var mongoutils = require('./mongoutils.js');

console.log(mongoutils.url);

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
  res.render('index', { title: 'Express' });
});

module.exports = router;
