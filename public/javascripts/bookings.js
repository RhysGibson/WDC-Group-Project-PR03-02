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
      var fulfilled;

      if(bookings[0].paymentfulfilled == "1"){
        fulfilled = "Paid";
      } else{
        fulfilled = "Not Paid";
      }
      document.getElementById("fulfilled").innerHTML = "Payment fulfilled: "+fulfilled;
      var d1 = Date.parse(bookings[0].datein);
      var date1 = new Date(d1);
      var dateFormat1 = date1.getDate() + "/" + Number(date1.getMonth()+1) + "/" + date1.getFullYear();
      var d2 = Date.parse(bookings[0].dateout);
      var date2 = new Date(d2);
      var dateFormat2 = date2.getDate() + "/" + Number(date2.getMonth()+1) + "/" + date2.getFullYear();
      document.getElementById("dates").innerHTML = "Dates: "+dateFormat1+" - "+dateFormat2;
    }
  };

  xhttp.open("GET", "/bookings", false);

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
