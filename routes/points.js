var express = require('express');
var router = express.Router();

 // Mongo connect
var MongoClient = require('mongodb').MongoClient
   , assert = require('assert');
//
var mongoutils = require('./mongoutils.js');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
/* GET map page. */
router.get('/map', function(req, res, next) {

  MongoClient.connect(mongoutils.url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('points');
    // Insert some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      //assert.equal(2, docs.length);
      console.log("Found the following records");
      console.dir(docs);
      //callback(docs);
      console.log(JSON.stringify(docs));
      res.render('points/map', { title: 'Maker Map',points:JSON.stringify(docs) });
    });
  });
});

/* GET points json page. */
router.get('/json', function(req, res, next) {

  MongoClient.connect(mongoutils.url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('points');
    // Insert some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      //assert.equal(2, docs.length);
      console.log("Found the following records");
      console.dir(docs);
      res.json(docs);
      //callback(docs);
      //console.log(JSON.stringify(docs));
      //res.render('points/map', { title: 'Maker Map',points:JSON.stringify(docs) });
    });
  });
});
/* GET add page. */
router.get('/add', function(req, res, next) {
  res.render('points/add', { title: 'Express' });
});
/* GET add page. */
router.post('/add', function(req, res, next) {
  console.log(req.body);

  MongoClient.connect(mongoutils.url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('points');
    // Insert some documents
    collection.insertMany([
      req.body
    ], function(err, result) {
      assert.equal(err, null);
      //console.log("Inserted 3 documents into the document collection");
      console.log(result);
      db.close();
    });
  });
  res.redirect('map');
  //res.render('points/add', { title: 'Express' });
});

module.exports = router;
