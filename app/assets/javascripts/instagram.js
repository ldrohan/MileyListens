$( document ).ready(function() {
	getInstagram();
	// getEmbedLink("http://instagram.com/p/uL0dqjpetk/");
});

var pictureLinks = []
function getInstagram() {
  $.getJSON( "listening/instagram.json", function ( data ) {
  	var allEmbedLinks = []
  	var counter = 0
  		for(var i in data) {
  		counter ++
  		console.log(data[i]);
  		console.log(counter);	
  		getEmbedLink(data[i], counter);
  		}
  		// setSliderPhotos(allEmbedLinks);
  });
}



function getEmbedLink(link, sliderNumber) {
	// setSliderPhotos();
	var embedLink 
	$.ajax({
    url: "http://api.instagram.com/oembed?url=" + link,
    dataType: 'jsonp',
    success: function(dataJsonp){
       embedLink = dataJsonp['url'];
       $('#slider' + sliderNumber).css("background-image", "url(" + embedLink + ")");
       console.log(embedLink);
       // allEmbedLinks.push(embedLink);
    }
	});
}

// function setSliderPhotos(allEmbedLinks) {
// 	$('#sliderOne').css("background-image", "url(" + allEmbedLinks[0] + ")");
// 	$('#sliderTwo').css("background-image", "url(" + allEmbedLinks[1] + ")"); 
// 	$('#sliderThree').css("background-image", "url(" + allEmbedLinks[2] + ")");   
// }




