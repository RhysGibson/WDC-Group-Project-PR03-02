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

function initHotelMap(){
  map = new google.maps.Map(document.getElementById('overviewMap'), {
    zoom: 20,
    center: hotelhilton
  });
  var marker = new google.maps.Marker({
    position: hotelhilton,
    map: map
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


function mapSearch(){
  var searchLocationName = document.getElementById('searchReq').value;
  var hotel = adelaide;
  var zoom = 15;
  var showMarker = false;
  clearMarkers();
  if(searchLocationName == "Hilton Hotel"){
    hotel = hotelhilton;
    zoom = 20;
  } else if(searchLocationName == "Hotel Grand Chancellor"){
    hotel = hotelchancellor;
    zoom = 20;
  } else if(searchLocationName == "Hotel Richmond"){
    hotel = hotelrichmond;
    zoom = 20;
  } else if(searchLocationName == "The Hotel Metropolitan"){
    hotel = hotelmetropolitan;
    zoom = 20;
  } else if(searchLocationName == "Majestic Roof Garden Hotel"){
    hotel = hotelmajesticroof;
    zoom = 20;
  }
  if(hotel!=adelaide){
    showMarker = true;
  } else {
    map.setZoom(zoom);
  }
  map.panTo(hotel);
  if(showMarker){
    var marker = new google.maps.Marker({
      position: hotel,
      map: map
    });
    marker.addListener('click', function() {
      showInfo(hotel);
      map.setZoom(zoom);
      map.setCenter(marker.getPosition());
    });
    markers.push(marker);
  }
}

function showInfo(hotel){
  var name = "Adelaide";
  var description = "A wonderful city filled with even more wonderful hotels."
  var cost = "No hotels selected."
  document.getElementById('floating-panel').style.display = "block";
  if(hotel===hotelhilton){
    name = "Hilton Hotel";
    description = "The Hilton Hotel is located in a central location within Adelaide."
    cost = "Cost: $500";
  } else if(hotel==hotelchancellor){
    name = "Hotel Grand Chancellor";
    description = "A hotel with many fine qualities such as a central location and access to public transport.";
    cost = "Cost: $300";
  } else if(hotel==hotelrichmond){
    name = "Hotel Richmond";
    description = "A hotel located on Rundle Mall. Provides easy access to shopping."
    cost = "Cost: $350";
  } else if(hotel==hotelmetropolitan){
    name = "The Hotel Metropolian";
    description = "Adjacent to Her Majesty's Theatre and opposite Adelaide Central Market, this subdued, long-standing pub with rooms dates from 1883."
    cost: "Cost: $250";
  } else if(hotel==hotelmajesticroof){
    name = "Majestic Roof Garden Hotel";
    description = "A 7-minute walk from shopping at Rundle Mall, this modern hotel also lies 1.3 km from Adelaide train station";
    cost: "Cost: $350";
  }
  document.getElementById('mapHotelName').innerHTML = name;
  document.getElementById('mapHotelDesc').innerHTML = description;
  document.getElementById('mapHotelCost').innerHTML = cost;
}

function hideSidePanel(){
  document.getElementById('floating-panel').style.display = "none";
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