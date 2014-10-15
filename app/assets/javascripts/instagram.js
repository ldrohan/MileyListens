$( document ).ready(function() {
	getInstagram();
});

var pictureLinks = []
function getInstagram() {
  $.getJSON( "listening/instagram.json", function ( data ) {
  		for(var i in data) {
  		pictureLinks.push(data[i]);
  		}
  		console.log(pictureLinks.length);
  });
}

