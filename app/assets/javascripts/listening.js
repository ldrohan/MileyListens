$( document ).ready(function() {
    getToken();
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVBlNWIzMWRhZDQ2NTA3NTU3ZTE3ODc1OTIxYTVjYzZmZSIsImlzcyI6IkFDZjM1NTIxNWUwZjVhZGIzZTZjZDM2YTE3YWIwMWI0NWQiLCJleHAiOjE0MTI4MDc4NjJ9.qwgXB9xr25-jSDsOvOBbmfg5zZLavnGw4nosM3bakn4';
    Twilio.Device.setup(token,{"debug":true});

    $('button').click(function() {
    	getTweets();
    });
	});

var modalID="";
modalID += "<div id=\"myModal";


var modalOne="";
modalOne += "\" class=\"modal fade\">";
modalOne += "    <div class=\"modal-dialog\">";
modalOne += "        <div class=\"modal-content\">";
modalOne += "            <div class=\"modal-header\">";
modalOne += "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
modalOne += "                <h4 class=\"modal-title\">Talkin Bout Miley:<\/h4>";
modalOne += "            <\/div>";
modalOne += "            <div class=\"modal-body\">";


var modalTwo="";
modalTwo += "<\/div>";
modalTwo += "            <div class=\"modal-footer\">";
modalTwo += "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close<\/button>";
modalTwo += "            <\/div>";
modalTwo += "        <\/div>";
modalTwo += "    <\/div>";
modalTwo += "  <\/div>";



function getTweets() {
	$.getJSON( "listening/main.json", function( data ) {
 	  for (var tweet in data) {
 	  	if (data !== null) {
 	  		console.log(data[tweet]);
        var currentModal = '#myModal' + tweet;
        var currentTweet = data[tweet];
  			$('#tweets').append(modalID + tweet + modalOne + '<li>' + currentTweet + '</li>' + modalTwo);
  			openModal(currentModal);
        sendVoiceText(currentModal, currentTweet);
        speak(currentTweet);
  		}	else {
  			alert("Keep listening. She's out there.");
  		}
  	}
  });
}

function getToken() {
  $.getJSON( "listening/token.json", function ( data ) {
    console.log(data);
    return(data);
    // Twilio.Device.setup(token,{"debug":true});
  });
}

// Sends current tweet to backend Twilio text to speech converter
function sendVoiceText(currentModal, currentTweet) {
  $.ajax({
    url: ('listening/voice'),
    method: ('post'),
    data: {
      "tweets": {
          currentModal: currentTweet
      }
    },
    dataType: "json",
      success: function(data) {
      console.log(data);
    }
  });
}

// Actually speaks the tweet, in theory anyway

function speak(currentTweet) {
  var tweetText = currentTweet;
  Twilio.Device.connect({ 'tweetText':tweetText });
}


function openModal(modal) {
	$(modal).modal('show');
}

function closeModal() {
	$("#myModal").modal('hide');
}