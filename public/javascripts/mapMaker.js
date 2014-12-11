var initialLocation;
var currLong;
var currLat;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var browserSupportFlag =  new Boolean();
var map;

function initialize() {
  var myOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  // Try W3C Geolocation (Preferred)
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      currLong = position.coords.longitude;
      currLat = position.coords.latitude;
      initialLocation = new google.maps.LatLng(currLat,currLong);
      map.setCenter(initialLocation);
      currMarkerMaker(initialLocation);
      storePrepare();
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    });
  }
  // Browser doesn't support Geolocation
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      alert("Geolocation service failed.");
      initialLocation = newyork;
    } else {
      alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
      initialLocation = siberia;
    }
    map.setCenter(initialLocation);
  }
}
google.maps.event.addDomListener(window, 'load', initialize);

function currMarkerMaker (initialLocation) {
    new google.maps.Marker({
                position: initialLocation,
                map: map,
                animation: google.maps.Animation.DROP,
                title:"Current Location"
            });
}



// function Map(){
//   var initialLocation;
//   var browserSupportFlag =  new Boolean();
//   var myOptions = {
//     zoom: 17,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   }

// //   var stylearr = [
// //         {
// //           featureType: "all",
// //           stylers: [
// //             { saturation: -80 }
// //           ]
// //         },{
// //           featureType: "road.arterial",
// //           elementType: "geometry",
// //           stylers: [
// //             { hue: "#00ffee" },
// //             { saturation: 50 }
// //           ]
// //         },{
// //           featureType: "poi.business",
// //           elementType: "labels",
// //           stylers: [
// //             { visibility: "off" }
// //           ]
// //         }
// //       ];
// }

// Map.prototype.initialize = function() {
//     var map = new google.maps.Map(document.getElementById('map-canvas'), this.mapOptions);
//     if(navigator.geolocation) {
//       browserSupportFlag = true;
//       navigator.geolocation.getCurrentPosition(
//         function(position) {
//             console.log(position.coords.latitude);
//             console.log(position.coords.longitude);
//             var lat = position.coords.latitude;
//             var lon = position.coords.longitude;
//             initialLocation = new google.maps.LatLng(lat,lon);
//             // function setInitialLocationAndCenter(initialLocation){
//               console.log(initialLocation);
//               map.setCenter(initialLocation);
//             // }
//             // setInitialLocationAndCenter(initialLocation);
            
//             console.log(map);
            
//             // var marker = new google.maps.Marker({
//             //     position: initialLocation,
//             //     map: map,
//             //     animation: google.maps.Animation.DROP,
//             //     title:"Hello World!"
//             // });
//             // var infowindow = new google.maps.InfoWindow({
//             //   content: "You made it"
//             // });
//             // var click = true;
//             // google.maps.event.addListener(marker, 'click', function() {
//             //   if (click) {
//             //     infowindow.open(map, marker);
//             //     click = false;
//             //   } else { 
//             //     infowindow.close();
//             //     click = true;
//             //   }
//             // });
//       }, function() {
//         this.handleNoGeolocation(browserSupportFlag);
//       });
//     }
//     else {
//       browserSupportFlag = false;
//       this.handleNoGeolocation(browserSupportFlag);
//     }
//   }

// Map.prototype.handleNoGeolocation = function(errorFlag) {
//     if (errorFlag == true) {
//       alert("Geolocation service failed.");
//       initialLocation = google.maps.LatLng(34.0500, 118.2500);
//     } else {
//       alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
//       initialLocation = google.maps.LatLng(34.0500, 118.2500);
//     }
//     map.setCenter(initialLocation);
// }

// $(function(){
// var NMap = new Map();
// console.log(NMap);
// google.maps.event.addDomListener(window, 'load', NMap.initialize());
// });
