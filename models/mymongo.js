var util = require("util");
var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/TourGuides';
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});

// INSERT
exports.insert = function(collection, query, callback) {
        console.log("start insert");
        mongoDB.collection(collection).insert(
          query,
          {safe: true},
          function(err, crsr) {
            if (err) doError(err);
            callback(crsr);
          });
        console.log("leaving insert");
}

// FIND
exports.find = function(collection, query, callback) {
        var crsr = mongoDB.collection(collection).find(query);
        crsr.toArray(function(err, docs) {
          if (err) doError(err);
          callback(docs);
        });
 }

exports.findOne = function(collection, query, callback) {
        mongoDB.collection(collection).findOne(query, function(err, docs) {
          if (err) doError(err); 
          console.log(docs);
          callback(docs);
        });
 }


// UPDATE
exports.update = function(collection, query, callback) {
          mongoDB.collection(collection).update(
            JSON.parse(query.find),
            JSON.parse(query.update), {
              new: true
            }, function(err, crsr) {
              if (err) doError(err);
              callback('Update succeeded');
        });
  }

var doError = function(e) {
        util.debug("ERROR: " + e);
        throw new Error(e);
    }