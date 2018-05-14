var adelaide = {lat: -34.928499, lng: 138.600746};

function initManagementMap(){
  map = new google.maps.Map(document.getElementById('manageHotelsMap'), {
    zoom: 15,
    center: adelaide
  });
}
