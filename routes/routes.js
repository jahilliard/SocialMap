var pinMod = require("../models/pins.js");
var eventMod = require("../models/event.js");
var locationMod = require("../models/location.js");
var myMongo = require("../models/myMongo.js");
var Qs = require('qs');
var google = require('googleapis');
var userMod = require('../models/user.js');

var currUser;

// profile.emails[0].value

exports.findOrCreate = function (profile, done, accessToken) {
    console.log(String(profile._json.id));
    var tempCompare = String(profile._json.id);
    myMongo.findOne('users', { "facebook.id" : tempCompare },
        function(model) {
                currUser = model;
                console.log(currUser);
                if (currUser === null) {
                    currUser = new userMod();
                    currUser.initializeUser(profile.displayName, profile.emails[0].value, profile.username, 'facebook', profile._json, accessToken);
                    console.log(currUser);
                    myMongo.insert('users', currUser,
                                        function(model1) {
                                            currUser = model1;
                                            // res.render('home',{currUser: currUser});
                                            done(null, currUser);
                                        });
                 }   
                else if (currUser.facebook.id === tempCompare) {
                  // res.render('home',{currUser: currUser});
                  done(null, currUser);
                }
                else {
                  return myMongo.doError("error");
                }
        });
}

exports.findInUserDB = function (user, done) {
    console.log(String(user.id));
    myMongo.findOne('users', { "facebook.id" : user.facebook.id },
        function(err, model) {
                currUser = model;
                console.log(currUser);
                if (typeof currUser !== 'undefined') {
                  done(null, currUser);
                }
                else {
                  return myMongo.doError("error");
                }
        });
}


setScore = function(thisid, callback) {
    console.log(this);
    var tempScore = 0;
    myMongo.find('pins', {event_id: thisid}, function(crsr){
        crsr.forEach(function(x){
            console.log("BOOYA");
            if(x.vote === "true"){
                tempScore = tempScore +1;
            } else {
                tempScore = tempScore -1;
            }
        });
        console.log('score is' + tempScore);
        this.score = Number(tempScore);
        console.log(this.score);
        console.log(this);
        callback(score);
    });
};


var pin;
var location;
var eventcurr;


exports.makeEventorPin = function(req, res, next) {
    location = new locationMod();
    location.initializeLocation(req.params.currLat, req.params.currLong);
    console.log(location);
    var isInLoc=false;
    console.log("req.query is " + JSON.stringify(req.params));
    myMongo.find('events', {}, function(crsr){
        crsr.forEach(function(x){
            if(location.calculateIfInEvent(x)){
                eventcurr = new eventMod();
                eventcurr.initializeEvent(x.name, x.longitude, x.latitude, x.type, x.datetime);
                if (!pin){
                    pin = new pinMod();
                    pin.initializePin(req.params.currLat, req.params.currLong, req.params.vote, x._id);
                    myMongo.insert('pins', pin, function(pin) {
                        setScore(x._id, function(score){
                            eventcurr.score = score;
                            res.render('redirEvent.ejs');
                        });
                    });
                } 
                isInLoc = true;
            }
        });
        ifNotInLoc(isInLoc, req, res);
    });
}

exports.GotoEventPage = function(req, res, next){
    console.log(eventcurr);
    res.render('eventForm.ejs',  {'eventcurr' : eventcurr});
}

function ifNotInLoc(isInLoc, req, res){
    if(isInLoc === false){
        eventcurr = new eventMod();
        eventcurr.initializeEvent("None", req.params.currLat, req.params.currLong, "None", "None");
        myMongo.insert('events', eventcurr, function(eventcurrData) { 
            pin = new pinMod();
            pin.initializePin(req.params.currLat, req.params.currLong, req.params.vote, eventcurrData[0]._id);
            myMongo.insert('pins', pin, function(pin) { 
                    setScore(eventcurrData[0]._id, function(score){
                            eventcurr.score = score;
                            res.render('redirEvent.ejs');
                    });
            });
        });
    }
}

exports.loggedIn = function(req, res, next) {
    if (currUser) {
        next();
    } else {
        res.redirect('/');
    }
}



exports.ioInit = function(io) {
    io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    });

}





// In the case that no route has been matched
exports.errorMessage = function(req, res, next) {
  var message = '<p>Error, did not understand path '+req.path+"</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
}
