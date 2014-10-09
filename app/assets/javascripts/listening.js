$( document ).ready(function() {
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
        var currentModal = '#myModal' + tweet;
        var currentTweet = data[tweet];
  			$('#tweets').append(modalID + tweet + modalOne + '<li>' + currentTweet + '</li>' + modalTwo);
  			openModal(currentModal);
        sendVoiceText(currentModal, currentTweet);
       
        // speak(currentTweet);
        // closeModal(currentModal);
  		}	else {
  			 alert("Keep listening. She's out there.");
  		}
  	}
  });
}

function getToken() {
  $.getJSON( "listening/token.json", function ( data ) {
      return(data);
    // Twilio.Device.setup(token,{"debug":true});
  });
}

// Sends current tweet to backend Twilio text to speech converter
function sendVoiceText(currentModal, currentTweet) {
    // speak(currentTweet);

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
  closeModal(currentModal);
}

// Actually speaks the tweet, in theory anyway
function speak(currentTweet) {
  var currentTweet = currentTweet;
  // Twilio.Device.connect({ 'currentTweet':currentTweet });
}


function openModal(modal) {
	$(modal).modal('show');
}

// Listens for twilio disconnect and closes Modal
function closeModal(modal) {
  setTimeout(function() {
    $(modal).modal('hide');
  }, 5000);
}