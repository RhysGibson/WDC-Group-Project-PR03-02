var bookings = [];

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
    }
  }

  xhttp.open("GET", "/bookings", false);

  xhttp.send();
}

function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]) : null;
  }
