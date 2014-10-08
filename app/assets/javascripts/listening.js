$( document ).ready(function() {
    $('button').click(function() {
    	getTweets();
    });
	});

var modalOne="";
modalOne += "<div id=\"myModal\" class=\"modal fade\">";
modalOne += "    <div class=\"modal-dialog\">";
modalOne += "        <div class=\"modal-content\">";
modalOne += "            <div class=\"modal-header\">";
modalOne += "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;<\/button>";
modalOne += "                <h4 class=\"modal-title\">Miley BaayBee<\/h4>";
modalOne += "            <\/div>";
modalOne += "            <div id=\"tweets\" class=\"modal-body\">";

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
  			$('#tweets').append(modalOne + '<li>' + data[tweet] + '</li>' + modalTwo);
  			openModal();
  		}	else {
  			alert("Keep listening. She's out there.");
  		}
  	}
  });
}

function openModal() {
	$("#myModal").modal('show');
}
function closeModal() {
	$("#myModal").modal('hide');
}