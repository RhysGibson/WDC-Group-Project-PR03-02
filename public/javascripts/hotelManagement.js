var adelaide = {lat: -34.928499, lng: 138.600746};
var marker = null;
var buttonnum = 0;
var hotels = [];

function initManageHotels(){
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    hotels = JSON.parse(xhttp.responseText);
    var hotelNames = document.getElementsByClassName('manageHotelName');
    var hotelDeals = document.getElementsByClassName('manageHotelDeals');
    var hotelDescriptions = document.getElementsByClassName('manageHotelDescription');
    var hotelRooms = document.getElementsByClassName('manageHotelRooms');
    var hotelAdditionals = document.getElementsByClassName('manageHotelAdditional');
    // Do this temporarily while we implement the rest later
    hotelNames[0].innerHTML = hotels[0].name;
    hotelDescriptions[0].innerHTML = hotels[0].description;
    hotelAdditionals[0].innerHTML = hotels[0].additional;
  };

  xhttp.open("GET", "/hotels.json", false);

  xhttp.send();
}

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

function changeName(hotel){
  var hotelNameButtons = document.getElementsByClassName('manageHotelNameButton');
  var hotelNames = document.getElementsByClassName('manageHotelName');
  // Create Input
  var input = document.createElement('INPUT');
  input.setAttribute("type", "text");
  input.name = "hotelname";
  input.value = hotelNames[hotel].innerHTML;
  input.defaultValue = "Enter new name";
  input.maxLength = "50";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    hotelNames[hotel].innerHTML = input.value;
    input.parentNode.removeChild(input);
    submitButton.parentNode.removeChild(submitButton);
    hotelNameButtons[hotel].style.display = "inline";
    hotelNames[hotel].style.display = "inline";
  };
  submitButton.innerHTML = "Submit name change";
  hotelNameButtons[hotel].style.display = "none";
  hotelNames[hotel].parentNode.insertBefore(submitButton, hotelNames[hotel].nextSibling);
  hotelNames[hotel].parentNode.insertBefore(input, hotelNames[hotel].nextSibling);
  hotelNames[hotel].style.display = "none";
}

function changeName(hotel){
  alert('You are trying to change the name of a hotel. If you really want to do this, please contact our staff so we can properly update you!');
  /*
  var hotelNameButtons = document.getElementsByClassName('manageHotelNameButton');
  var hotelNames = document.getElementsByClassName('manageHotelName');
  // Create Input
  var input = document.createElement('INPUT');
  input.setAttribute("type", "text");
  input.name = "hotelname";
  input.value = hotelNames[hotel].innerHTML;
  input.defaultValue = "Enter new name";
  input.maxLength = "50";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    hotelNames[hotel].innerHTML = input.value;
    input.parentNode.removeChild(input);
    submitButton.parentNode.removeChild(submitButton);
    hotelNameButtons[hotel].style.display = "inline";
    hotelNames[hotel].style.display = "inline";
  }
  submitButton.innerHTML = "Submit name change";
  hotelNameButtons[hotel].style.display = "none";
  hotelNames[hotel].parentNode.insertBefore(submitButton, hotelNames[hotel].nextSibling);
  hotelNames[hotel].parentNode.insertBefore(input, hotelNames[hotel].nextSibling);
  hotelNames[hotel].style.display = "none";
  */
}

function changeDescription(hotel){
  var hotelDescriptionButtons = document.getElementsByClassName('manageHotelDescriptionButton');
  var hotelDescriptions = document.getElementsByClassName('manageHotelDescription');
  // Create Input
  var input = document.createElement('textarea');
  input.setAttribute("type", "text");
  input.name = "hoteldescription";
  input.rows = "10";
  input.cols = "35";
  input.height = "30%";
  input.value = hotelDescriptions[hotel].innerHTML;
  input.placeholder = "Enter new description";
  input.maxLength = "200";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    hotelDescriptions[hotel].innerHTML = input.value;
    input.parentNode.removeChild(input);
    submitButton.parentNode.removeChild(submitButton);
    hotelDescriptionButtons[hotel].style.display = "block";
    hotelDescriptions[hotel].style.display = "block";
  };
  submitButton.innerHTML = "Submit description change";
  hotelDescriptionButtons[hotel].style.display = "none";
  hotelDescriptions[hotel].parentNode.insertBefore(submitButton, hotelDescriptions[hotel].nextSibling);
  hotelDescriptions[hotel].parentNode.insertBefore(input, hotelDescriptions[hotel].nextSibling);
  hotelDescriptions[hotel].style.display = "none";
}

function changeAdditional(hotel){
  var hotelDescriptionButtons = document.getElementsByClassName('manageHotelAdditionalButton');
  var hotelDescriptions = document.getElementsByClassName('manageHotelAdditional');
  // Create Input
  var input = document.createElement('textarea');
  input.setAttribute("type", "text");
  input.name = "hoteldescription";
  input.rows = "10";
  input.cols = "35";
  input.height = "30%";
  input.value = hotelDescriptions[hotel].innerHTML;
  input.placeholder = "Enter new description";
  input.maxLength = "100";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    hotelDescriptions[hotel].innerHTML = input.value;
    input.parentNode.removeChild(input);
    submitButton.parentNode.removeChild(submitButton);
    hotelDescriptionButtons[hotel].style.display = "block";
    hotelDescriptions[hotel].style.display = "block";
  };
  submitButton.innerHTML = "Submit description change";
  hotelDescriptionButtons[hotel].style.display = "none";
  hotelDescriptions[hotel].parentNode.insertBefore(submitButton, hotelDescriptions[hotel].nextSibling);
  hotelDescriptions[hotel].parentNode.insertBefore(input, hotelDescriptions[hotel].nextSibling);
  hotelDescriptions[hotel].style.display = "none";
}

function addDeal(hotel){
  var hotelDeals = document.getElementsByClassName('manageHotelDeals');
  var hotelDealsButtons = document.getElementsByClassName('manageHotelDealsButton');
  // Create Input
  var input = document.createElement('INPUT');
  input.setAttribute("type", "text");
  input.name = "hoteldeal";
  input.defaultValue = "Enter deal description";
  input.maxLength = "50";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    var li = document.createElement('li');
    var removeBut = document.createElement('button');
    input.parentNode.removeChild(input);
    submitButton.parentNode.removeChild(submitButton);
    removeBut.innerHTML = "Remove deal";
    removeBut.onclick = removeDeal(hotel,hotelDeals[hotel].childNodes.length);
    li.innerHTML = input.value;
    li.appendChild(removeBut);
    hotelDeals[hotel].appendChild(li);
    hotelDealsButtons[hotel].style.display = "block";
  };
  submitButton.innerHTML = "Submit deal";
  hotelDeals[hotel].parentNode.insertBefore(submitButton, hotelDeals[hotel].nextSibling);
  hotelDeals[hotel].parentNode.insertBefore(input, hotelDeals[hotel].nextSibling);
  hotelDealsButtons[hotel].style.display = "none";
}

function addRoom(hotel){
  var hotelDeals = document.getElementsByClassName('manageHotelRooms');
  var hotelDealsButtons = document.getElementsByClassName('manageHotelRoomsButton');
  // Create Input
  var input1 = document.createElement('INPUT');
  input1.setAttribute("type", "text");
  input1.name = "hotelroomtype";
  input1.defaultValue = "Enter room type";
  input1.maxLength = "25";
  var input2 = document.createElement('INPUT');
  input2.setAttribute("type", "number");
  input2.name = "hotelroomcost";
  input2.defaultValue = "Enter room cost per night";
  input2.maxLength = "10";
  // Create Submit Button
  var submitButton = document.createElement('button');
  submitButton.onclick = function(){
    var li = document.createElement('li');
    var p = document.createElement('p');
    p.innerHTML = "Type: "+input1.value;
    var sp = document.createElement('span');
    sp.innerHTML = "Cost per night: "+input2.value;
    var removeBut = document.createElement('button');
    input1.parentNode.removeChild(input1);
    input2.parentNode.removeChild(input2);
    submitButton.parentNode.removeChild(submitButton);
    removeBut.innerHTML = "Remove room";
    removeBut.onclick = removeRoom(hotel,hotelDeals[hotel].childNodes.length);
    li.appendChild(p);
    li.appendChild(sp);
    li.appendChild(removeBut);
    hotelDeals[hotel].appendChild(li);
    hotelDealsButtons[hotel].style.display = "block";
  };
  submitButton.innerHTML = "Submit deal";
  hotelDeals[hotel].parentNode.insertBefore(submitButton, hotelDeals[hotel].nextSibling);
  hotelDeals[hotel].parentNode.insertBefore(input2, hotelDeals[hotel].nextSibling);
  hotelDeals[hotel].parentNode.insertBefore(input1, hotelDeals[hotel].nextSibling);
  hotelDealsButtons[hotel].style.display = "none";
}

function removeDeal(hotel,num){
  alert('This function is buggy so is not implemented yet...');
}

function removeRoom(hotel,num){
  alert('This function is buggy so is not implemented yet...');
}

function addHotel(){
  alert('Not yet implemented.');
}

function sendPostSave(hotel){
  var xhttp = new XMLHttpRequest();
  var hotelNames = document.getElementsByClassName('manageHotelName');
  var hotelDeals = document.getElementsByClassName('manageHotelDeals');
  var hotelDescriptions = document.getElementsByClassName('manageHotelDescription');
  var hotelRooms = document.getElementsByClassName('manageHotelRooms');
  var hotelAdditionals = document.getElementsByClassName('manageHotelAdditional');

  // set temporarily while this doesn't work, everything else should still change
  var newDeals = hotels[hotel].deals;
  var newRooms = hotels[hotel].rooms;

  /*
  // save Rooms
  for(var i=0;i<hotelDeals[hotel].childNodes.length;i++){
    console.log(hotelDeals[hotel].childNodes[i].innerHTML);
  }

  // save Deals
  for(var i=0;i<hotelRooms[hotel].childNodes.length;i++){
    console.log(hotelRooms[hotel].childNodes[i].innerHTML);
  }*/

  xhttp.open("POST", "/editHotel.json", true);

  xhttp.setRequestHeader("Content-type","application/json");

  // Deals and Rooms do not save properly
  xhttp.send(JSON.stringify({hotelid:hotel,name:hotelNames[hotel].innerHTML,cost:hotels[hotel].cost,deals:newDeals,description:hotelDescriptions[hotel].innerHTML,rooms:newRooms,additional:hotelAdditionals[hotel].innerHTML}));
  alert('Successfully saved details! (Deals and Rooms not affected)!');
}

function fakeFunction(){
  alert('This does not yet do anything...');
}
