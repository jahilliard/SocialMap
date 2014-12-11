$(function() {
var socket = io();
$('#s').click(function(){
	console.log($('#m').val());
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  console.log(msg);
  $('#messages').append('<li>'+msg+'</li>');
});

});
