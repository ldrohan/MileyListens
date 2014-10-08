$( document ).ready(function() {
    $('button').click(function() {
    	alert("hi");
    	getTweets();
    });
	});

function getTweets() {
	$.getJSON( "listening/main.json", function( data ) {
 	  var allTweets = [];
 	  for (var tweet in data) {
  		allTweets.push(data[tweet]);
  		$('#tweets').append('<li>' + data[tweet] + '</li>');
  	}
  });
}

