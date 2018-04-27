var map = null;
var markers = [];
var adelaide = {lat: -34.928499, lng: 138.600746};
var hotelhilton = {lat: -34.929143, lng: 138.598906};
var hotelchancellor = {lat: -34.923553, lng: 138.596947};
var hotelrichmond = {lat: -34.922488, lng: 138.604227};
var hotelmetropolitan = {lat: -34.928518, lng: 138.597419};
var hotelmajesticroof = {lat: -34.923179, lng: 138.607706};

function initMap(){
  var searchedLoc = document.getElementById('searchReq').value;
  // Autocomplete taken from Google Maps page
  var input = document.getElementById('searchReq');
  // Restrict to Establishment because hotels can't be restricted?
  var options = {
    types: ['establishment']
  };
  var autocomplete = new google.maps.places.Autocomplete(input,options);
  // Map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: adelaide
  });
  if(searchedLoc!==""){
    map.setZoom(17);
  }
  // Set Autocomplete Restrictions
  autocomplete.bindTo('bounds', map);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });
  // Autocomplete Event Listener
  autocomplete.addListener('place_changed', function() {
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    marker.addListener('click', function() {
      showInfo(place.name);
      map.setZoom(20);
      map.setCenter(marker.getPosition());
    });
    markers.push(marker);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
  });
  mapSearch();
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
  console.log(searchLocationName);
  var hotel = adelaide;
  var zoom = 15;
  var showMarker = false;
  clearMarkers();
  if(searchLocationName == "Hilton Adelaide"){
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
      showInfo(searchLocationName);
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
  if(hotel==="Hilton Adelaide"){
    name = hotel;
    description = "The Hilton Hotel is located in a central location within Adelaide."
    cost = "Cost: $500";
  } else if(hotel==="Hotel Grand Chancellor Adelaide"){
    name = "Hotel Grand Chancellor Adelaide";
    description = "A hotel with many fine qualities such as a central location and access to public transport.";
    cost = "Cost: $300";
  } else if(hotel==="Hotel Richmond"){
    name = hotel;
    description = "A hotel located on Rundle Mall. Provides easy access to shopping."
    cost = "Cost: $350";
  } else if(hotel=="The Hotel hotelmetropolitan"){
    name = hotel;
    description = "Adjacent to Her Majesty's Theatre and opposite Adelaide Central Market, this subdued, long-standing pub with rooms dates from 1883."
    cost: "Cost: $250";
  } else if(hotel=="Majestic Roof Garden Hotel"){
    name = hotel;
    description = "A 7-minute walk from shopping at Rundle Mall, this modern hotel also lies 1.3 km from Adelaide train station";
    cost = "Cost: $350";
  }
  document.getElementById('mapHotelName').innerHTML = name;
  document.getElementById('mapHotelDesc').innerHTML = description;
  document.getElementById('mapHotelCost').innerHTML = cost;
}

function hideSidePanel(){
  document.getElementById('floating-panel').style.display = "none";
}

function manageBookingMap(hotelName) {
      map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: adelaide
  });
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
