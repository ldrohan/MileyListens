$( document ).ready(function() {
	getInstagram();
});

function getInstagram() {
  $.getJSON( "listening/instagram.json", function ( data ) {
  	var allEmbedLinks = []
  	var counter = 0
  		for(var i in data) {
  			counter ++
  			getEmbedLink(data[i], counter);
  		}
  });
}

function getEmbedLink(link, sliderNumber) {
	var embedLink 
	$.ajax({
    url: "http://api.instagram.com/oembed?url=" + link,
    dataType: 'jsonp',
    success: function(dataJsonp){
       var embedLink = dataJsonp['url'];
       var author_name = dataJsonp['author_name']
       var author_url = dataJsonp['author_url']
       var picTitle = dataJsonp['title']
       $('#slider' + sliderNumber).css("background-image", "url(" + embedLink + ")");
       $('#author' + sliderNumber).append('<a target="_blank" href="' + author_url + '">' + author_name + '</a>');
       $('#title' + sliderNumber).append(picTitle);
    }
	});
}



