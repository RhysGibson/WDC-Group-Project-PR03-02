var map = null;
var markers = [];
var hotels = [];
var adelaide = {lat: -34.928499, lng: 138.600746};
var hotelhilton = {lat: -34.929143, lng: 138.598906};
var currentlyselectedhotel = 1;

function initHotels(){
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    hotels = JSON.parse(xhttp.responseText);
    console.log(hotels);
  };

  xhttp.open("GET", "/hotels.json", false);

  xhttp.send();
}


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
  markers.push(marker);
}

function initMap(){
  var v1 = getParameterByName("search");
  document.getElementById('searchReq').value = v1;

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

    if (places.length === 0) {
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

  initHotels();

  if(searchedLoc!==""){
    google.maps.event.addListenerOnce(map, 'idle', function(){
      mapSearch();
      showInfo(searchedLoc);
    });
  }
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
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( {'address': searchLocationName + "Adelaide"}, function(results,status){
    if (status == google.maps.GeocoderStatus.OK) {
      var slat = results[0].geometry.location.lat();
      var slng = results[0].geometry.location.lng();
      var location = {lat: slat, lng: slng};
      map.panTo(location);
      console.log(results[0].place_id);
      var service = new google.maps.places.PlacesService(map);
      service.textSearch({query: searchLocationName, radius: '1000', location: map.getCenter()}, function(resultsnext,status){
        showInfo(resultsnext[0].name);
      });
    }
  });
  /*
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
  }*/
}

function showInfo(hotel){
  var name = "No information available";
  var description = "This is a placeholder description because no hotel was selected.";
  var cost = "No hotels selected.";
  var includes = "Please select a hotel.";
  document.getElementById('floating-panel').style.display = "block";
  for(var i=0;i<hotels.length;i++){
    if(hotel==hotels[i].hotelname){
      currentlyselectedhotel = hotels[i].hotelid;
      name = hotels[i].hotelname;
      description = hotels[i].hoteldescription;
      cost = "Cost: $"+hotels[i].hotelcost;
      includes = hotels[i].additionalinfo;
      break;
    }
  }

  document.getElementById('mapHotelName').innerHTML = name;
  document.getElementById('mapHotelDesc').innerHTML = description;
  document.getElementById('mapHotelCost').innerHTML = cost;
  document.getElementById('mapHotelIncludes').innerHTML = includes;
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
    var hotel = hotelhilton;
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

function goToOverviewFromMap(){
  var datein = getParameterByName("datein");
  var dateout = getParameterByName("dateout");
  location.href = "/files/hotelOverview.html?hotelid="+currentlyselectedhotel+"&datein="+datein+"&dateout="+dateout;
}
