var map = null;

function initMap(){
  var hotel = {lat: -34.9315857, lng: 138.56997239999998};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: hotel
  });
  var marker = new google.maps.Marker({
    position: hotel,
    map: map
  });
}

function goToSearch(){
  location.href = "search.html";
}

function mapSearch(){
  var searchLocationName = document.getElementById('searchReq').value;
  console.log(searchLocationName);
}
