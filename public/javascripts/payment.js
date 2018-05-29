var paymentHotel = [];

function initPayment(){
  var hotelid = getParameterByName("hotelid");
  var datein = getParameterByName("datein");
  var dateout = getParameterByName("dateout");
  var roomnum = Math.floor((Math.random() * 67) + 1);
  var dealnum = getParameterByName("dealnum");
  var hotelcost = document.getElementById("hotelcost");
  var hotelname = document.getElementById("hotelname");
  document.getElementById("datein").value = datein;
  document.getElementById("dateout").value = dateout;
  document.getElementById("roomnum").innerHTML = roomnum;
  document.getElementById("dealnum").value = dealnum;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    paymentHotel = JSON.parse(xhttp.responseText);
    console.log(paymentHotel);
    hotelname.innerHTML = "Confirm Booking to "+paymentHotel[0].hotelname;
    hotelcost.value = Number(paymentHotel[0].hotelcost)*Number(document.getElementById("numpeople").value);
    var deal = document.getElementById("dealnum");
    var numpeople = document.getElementById("numpeople");
    var cost = 0;
    if(numpeople.value=="1"){
      cost = Number((deal.value-1)*18) + Number(paymentHotel[0].hotelcost);
    } else{
      cost = Number((deal.value-1)*18*(numpeople.value)) + Number(0.5*Number(numpeople.value-1)*Number(paymentHotel[0].hotelcost))+ Number(paymentHotel[0].hotelcost);
    }
    hotelcost.innerHTML = cost;
  }

  xhttp.open("GET", "/hotels.json?hotelid="+hotelid, false);

  xhttp.send();
}

function makeBooking(){
  var xhttp = new XMLHttpRequest();

  var hotelid = getParameterByName("hotelid");
  var datein = document.getElementById("datein").value;
  var dateout = document.getElementById("dateout").value;
  var d1 = Date.parse(datein);
  var date1 = new Date(d1);
  var dateFormat1 = Number(date1.getMonth()+1) + "/" + date1.getDate() + "/" + date1.getFullYear();
  var d2 = Date.parse(dateout);
  var date2 = new Date(d2);
  var dateFormat2 = Number(date2.getMonth()+1) + "/" + date2.getDate() + "/" + date2.getFullYear();
  var roomnum = document.getElementById("roomnum").innerHTML;
  var bookingcost = document.getElementById("hotelcost").innerHTML;
  var numpeople = document.getElementById("numpeople").value;
  var dealnum = document.getElementById("dealnum").value;
  var imagefile = "/images/room1.jpg";
  if(dealnum=="2"){
    imagefile = "/images/room2.jpg";
  }

  xhttp.open("POST", "/makeBooking", true);

  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify({hotelid:hotelid,datein:dateFormat1,dateout:dateFormat2,roomnum:roomnum,imagefile:imagefile,cost:bookingcost,numpeople:numpeople}));
}

function checkPayment(){
  var deal = document.getElementById("dealnum");
  var numpeople = document.getElementById("numpeople");
  var cost = 0;
  if(numpeople.value=="1"){
    cost = Number((deal.value-1)*18) + Number(paymentHotel[0].hotelcost);
  } else{
    cost = Number((deal.value-1)*18*(numpeople.value-1)) + Number(0.5*Number(numpeople.value-1)*Number(paymentHotel[0].hotelcost))+ Number(paymentHotel[0].hotelcost);
  }
  console.log(cost);
  document.getElementById("hotelcost").innerHTML = cost;
}
