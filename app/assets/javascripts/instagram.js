$( document ).ready(function() {
	getInstagram();
	getEmbedLink("http://instagram.com/p/uL0dqjpetk/");
});

var pictureLinks = []
function getInstagram() {
  $.getJSON( "listening/instagram.json", function ( data ) {
  		for(var i in data) {
  		getEmbedLink(data[i]);
  		}
  });
}

function getEmbedLink(link) {
	var embedLink
	$.ajax({
    url: "http://api.instagram.com/oembed?url=" + link,
    dataType: 'jsonp',
    success: function(dataJsonp){
       embedLink = dataJsonp['url'];
       console.log(embedLink);
       $('.wide').css("background-image", "url(" + embedLink + ")");  
    }
	});
}

