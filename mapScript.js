var map = null;
var markers = [];
var adelaide = {lat: -34.928499, lng: 138.600746};
var hotelhilton = {lat: -34.929143, lng: 138.598906};
var hotelchancellor = {lat: -34.923553, lng: 138.596947};
var hotelrichmond = {lat: -34.922488, lng: 138.604227};
var hotelmetropolitan = {lat: -34.928518, lng: 138.597419};
var hotelmajesticroof = {lat: -34.923179, lng: 138.607706};

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: adelaide
  });
}

function setMapOnAll(map){
  for(var i = 0; i<markers.length; i++){
    markers[i].setMap(map);
  }
}

function clearMarkers(){
  setMapOnAll(null);
}

function goToSearch(){
  location.href = "search.html";
}


function mapSearch(){
  var searchLocationName = document.getElementById('searchReq').value;
  var hotel = adelaide;
  clearMarkers();
  if(searchLocationName == "Hilton Hotel"){
    hotel = hotelhilton;
  } else if(searchLocationName == "Hotel Grand Chancellor"){
    hotel = hotelchancellor;
  } else if(searchLocationName == "Hotel Richmond"){
    hotel = hotelrichmond;
  } else if(searchLocationName == "The Hotel Metropolitan"){
    hotel = hotelmetropolitan;
  } else if(searchLocationName == "Majestic Roof Garden Hotel"){
    hotel = hotelmajesticroof;
  }
  var marker = new google.maps.Marker({
    position: hotel,
    map: map
  });
  map.panTo(hotel);
  map.setZoom(20);
  markers.push(marker);
}

function manageBookingMap(hotelName) {
  clearMarkers();
    var hotel = adelaide;
    if(hotelName == "Hilton Hotel"){
    hotel = hotelhilton;
  }
    var marker = new google.maps.Marker({
    position: hotel,
    map: map
  });
  map.panTo(hotel);
  map.setZoom(20);
  markers.push(marker);
}
