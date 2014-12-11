function CurrLocation(){
	var latitude;
	var longitude;
}

CurrLocation.prototype.initializeLocation = function(latitude, longitude){
	this.latitude = Number(latitude);
	this.longitude = Number(longitude);
} 

CurrLocation.prototype.calculateIfInEvent = function(event) {
    var tempLong = Math.pow(event.longitude-this.longitude, 2);
    var tempLat = Math.pow(event.latitude-this.latitude, 2);
    var toSqrt = tempLat+tempLong;
    var toCheck = Math.round(Math.sqrt(toSqrt*10000000000000))/10000000000000;
    var hyp = (0.00625)*(1.4142135623730950488016887242096980785);
    console.log(toCheck);
    console.log(hyp);
    return (toCheck <= hyp);
}

module.exports = CurrLocation;