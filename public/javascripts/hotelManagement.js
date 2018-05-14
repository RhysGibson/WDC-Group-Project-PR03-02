var adelaide = {lat: -34.928499, lng: 138.600746};
var marker = null;

function initManagementMap(){
  map = new google.maps.Map(document.getElementById('manageHotelsMap'), {
    zoom: 13,
    center: adelaide,
    disableDefaultUI: true,
    zoomControl: true
  });

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });

  var input = document.getElementById('searchReq');
  var searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  marker = new google.maps.Marker({
    position: adelaide,
    map: map
  });
  marker.addListener('click',function(){
    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });

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
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        marker.addListener('click',function(){
          map.setZoom(20);
          map.setCenter(marker.getPosition());
        });


      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  map.setOptions({
    featureType: 'poi.business',
    stylers: [{visibility: 'off'}]
  });
}

function placeMarker(location) {
  marker.setMap(null);
  marker = new google.maps.Marker({
      position: location,
      map: map
  });
  marker.addListener('click',function(){
    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });
}
