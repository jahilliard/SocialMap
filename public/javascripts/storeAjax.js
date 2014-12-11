function storePrepare() {
   console.log("Loaded");
    $(".pinMakerButton").click(function(event){
      var vote;
      if (document.activeElement.id === "Ubutton"){
        vote = true;
      }
      if (document.activeElement.id === "Dbutton"){
        vote = false;
      }
      console.log(initialLocation);
      console.log("hit");
      console.log(vote);
          //to prevent default GET call
          event.preventDefault();
          // var initialLocationT= initialLocation.trim();
  
        $.ajax({
          //creates route for pastaCreate
          url:"/makePin/"+currLat+"/"+ currLong +"/" + vote,
          type:'POST',
          success: function(data){
            $("#responseArea").html(data);
          }
        });
    });
};

function goToEvent() {
  window.location.replace("/event");
}