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
// modalTwo += "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close<\/button>";
modalTwo += "            <\/div>";
modalTwo += "        <\/div>";
modalTwo += "    <\/div>";
modalTwo += "  <\/div>";


var timeToClose = 4000  

function getTweets() {
	$.getJSON( "listening/main.json", function( data ) {
      var newData = []
      var length = (data.length)
 	    for (var tweet in data) {
 	  	 if (data !== null) {
          var currentModal = '#myModal' + tweet;
          newData.push(currentModal);
          var currentTweet = data[tweet];
          $('#tweets').append(modalID + tweet + modalOne + '<li>' + currentTweet + '</li>' + modalTwo);
  			 openModal(currentModal);
          sendVoiceText(currentModal, currentTweet);
          // closeModal(data,currentModal,timeToClose);
  		  }	else {
  			   alert("Keep listening. She's out there.");
  		  }
  	  }
      var reverseData = newData.reverse();
      for (var i in reverseData) {
        timeToClose += 4000
        closeModal(reverseData[i],timeToClose);
      }
  });
}

function getToken() {
  $.getJSON( "listening/token.json", function ( data ) {
      return(data);
  });
}

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
  var currentTweet = currentTweet;
  // Twilio.Device.connect({ 'currentTweet':currentTweet });
}


function openModal(modal) {
	$(modal).modal('show');
  
}

// Closes Modal after 6 seconds
function closeModal(deleteModal,timeToClose) {
    setTimeout(function() {
      $(deleteModal).modal('hide');
    }, timeToClose);
  }
