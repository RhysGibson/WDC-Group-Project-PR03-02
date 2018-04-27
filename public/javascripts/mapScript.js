var map = null;
var markers = [];
var adelaide = {lat: -34.928499, lng: 138.600746};
var hotelhilton = {lat: -34.929143, lng: 138.598906};
var hotelchancellor = {lat: -34.923553, lng: 138.596947};
var hotelrichmond = {lat: -34.922488, lng: 138.604227};
var hotelmetropolitan = {lat: -34.928518, lng: 138.597419};
var hotelmajesticroof = {lat: -34.923179, lng: 138.607706};

function setMapOnAll(map){
  for(var i = 0; i<markers.length; i++){
    markers[i].setMap(map);
  }
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    showInfo(place.name);
    map.setZoom(20);
    map.setCenter(marker.getPosition());
  });
}

function initMap(){
  // Map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: adelaide
  });
  // Show All Hotels on Location
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: adelaide,
    radius: 1000,
    type: ['lodging']
  }, callback);

  var searchedLoc = document.getElementById('searchReq').value;
  if(searchedLoc!==""){
    map.setZoom(20);
  }
  // Search taken from Google Maps API Developer Page
  var options = {
    types: ['establishment']
  };
  var input = document.getElementById('searchReq');
  var searchBox = new google.maps.places.SearchBox(input,options);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  /*var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });*/
  // Search Box Event Listener
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      // Show all previous markers

      // var icon = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // };

      // Create a marker for each place.
      // markers.push(new google.maps.Marker({
      //   map: map,
      //   title: place.name,
      //   position: place.geometry.location
      // }));

      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(20);
        }
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });
        showInfo(place.name);
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        marker.addListener('click',function(){
          showInfo(place.name);
          map.setZoom(20);
          map.setCenter(marker.getPosition());
        });
        markers.push(marker);


      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
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

function clearMarkers(){
  setMapOnAll(null);
}

function showMarkers() {
  setMapOnAll(map);
}

function resetZoom(){
  map.setZoom(15);
}

function mapSearch(){
  var searchLocationName = document.getElementById('searchReq').value;
  var hotel = adelaide;
  var zoom = 15;
  var showMarker = false;
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
  showInfo(searchLocationName);
}

function showInfo(hotel){
  var name = "Adelaide";
  var description = "A wonderful city filled with even more wonderful hotels.";
  var cost = "No hotels selected.";
  var includes = "Please select a hotel.";
  document.getElementById('floating-panel').style.display = "block";
  if(hotel==="Hilton Adelaide"){
    name = hotel;
    description = "The Hilton Hotel is located in a central location within Adelaide.";
    cost = "Cost: $500";
    includes = "Free Wifi and Complimentary Breakfast Everyday.";
  } else if(hotel==="Hotel Grand Chancellor Adelaide"){
    name = "Hotel Grand Chancellor Adelaide";
    description = "A hotel with many fine qualities such as a central location and access to public transport.";
    cost = "Cost: $300";
    includes = "Free Wifi";
  } else if(hotel==="Hotel Richmond"){
    name= hotel;
    description = "A hotel located on Rundle Mall. Provides easy access to shopping.";
    cost = "Cost: $350";
    includes = "Free Wifi";
  } else if(hotel=="The Hotel hotelmetropolitan"){
    name = hotel;
    description = "Adjacent to Her Majesty's Theatre and opposite Adelaide Central Market, this subdued, long-standing pub with rooms dates from 1883.";
    cost = "Cost: $250";
    includes = "Free Wifi";
  } else if(hotel=="Majestic Roof Garden Hotel"){
    name = hotel;
    description = "A 7-minute walk from shopping at Rundle Mall, this modern hotel also lies 1.3 km from Adelaide train station";
    cost = "Cost: $350";
    includes = "Free Wifi and Complimentary Breakfast for the first 2 nights.";
  }
  document.getElementById('mapHotelName').innerHTML = name;
  document.getElementById('mapHotelDesc').innerHTML = description;
  document.getElementById('mapHotelCost').innerHTML = cost;
  document.getElementById('mapHotelIncludes').innerhtml = includes;
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

    hotel = hotelhilton;

    var marker = new google.maps.Marker({
    position: hotel,
    map: map
  });
  map.panTo(hotel);
  map.setZoom(20);
  markers.push(marker);
}
