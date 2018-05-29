var bookings = [];

function initBookingsMap(){
  // Map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: adelaide,
    disableDefaultUI: true
  });
}

function initBookings(){
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    bookings = JSON.parse(xhttp.responseText);
    console.log(bookings);
    if(bookings.length=="0"){
      document.location="/files/bookingNotMade.html";
    } else{
      fade('bookingBody');
        for(var i = 0; i < bookings.length;i ++){
        addElement(bookings[i].bookingid);
      }
    }
  };

  xhttp.open("GET", "/bookings?userid="+session[0].userid, false);

  xhttp.send();
}



//function loadBookings(){
//  var xhttp = new XMLHttpRequest();
//
//  xhttp.onreadystatechange = function() {
//      console.log("adding bookings");
//    bookings = JSON.parse(xhttp.responseText);
//    for(var i = 0; i < bookings.length();i ++){
//        addElement(bookings[i].id);
//    }
//  }
//
//  xhttp.open("GET", "/bookings", false);
//
//  xhttp.send();
//}
