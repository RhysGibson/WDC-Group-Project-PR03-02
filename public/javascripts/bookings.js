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
      document.getElementById("hotelname").innerHTML = bookings[0].hotelname;
      document.getElementById("roomNumber").innerHTML = bookings[0].roomnum;
      document.getElementById("cost").innerHTML = "Cost: $"+bookings[0].cost;
      document.getElementById("numpeople").innerHTML = "Number of People: "+bookings[0].numpeople;
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
  }

  xhttp.open("GET", "/bookings", false);

  xhttp.send();
}

function setMapLocation(lati,long){
  var location = {lat: lati, lng: long};
  map.panTo(location);
}
