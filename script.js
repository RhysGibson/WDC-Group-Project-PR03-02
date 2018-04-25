var peopleCount = 0;
var setLocation = "Adelaide";
var roomChoice;



function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function search(){
  document.getElementById("numPeopleSearch").innerHTML = peopleCount;
  //document.getElementById("locationSearch").innerHTML = setLocation;
}

function getPriceRangeMin(){
  var minPrice = document.getElementById("priceRangeSearchMin");
  var maxPrice = document.getElementById("priceRangeSearchMax");
  console.log(minPrice.value);
  if(minPrice.value>=maxPrice.value){
    minPrice.value = maxPrice.value-1;
    console.log(minPrice.value);
    //minPrice.innerText = maxPrice.value-1;
  }
  document.getElementById("priceRangeText").innerHTML = "$ " + minPrice.value + "-" + maxPrice.value;
}

function getPriceRangeMax(){
  var minPrice = document.getElementById("priceRangeSearchMin");
  var maxPrice = document.getElementById("priceRangeSearchMax");
  console.log(minPrice.value);
  if(minPrice.value>maxPrice.value){
    maxPrice.value = Number(minPrice.value)+Number(1);
    console.log(maxPrice.value);
    //minPrice.innerText = maxPrice.value-1;
  }
  document.getElementById("priceRangeText").innerHTML = "$ " + minPrice.value + "-" + maxPrice.value;
}

function getHotelStarsSearch(){
  var hotelStars = document.getElementById("hotelStarsText");
  hotelStars.innerHTML = "";
  for(var i = 0; i<document.getElementById("hotelStarsSearch").value; i++){
    hotelStars.innerHTML += '<i class="fa fa-star"></i>';
  }
}

function getUserRatingSearch(){
  var userRating = document.getElementById("userRatingText");
  userRating.innerHTML = "";
  for(var i = 0; i<document.getElementById("userRatingSearch").value; i++){
    userRating.innerHTML += '<i class="fa fa-star"></i>';
  }
}

function setSearchNumbers(){
  // Set Bottom Section
  //var Elements
  var childCount = document.getElementById("searchResults").childElementCount;
  childCount--;
  var pageCount = Math.ceil(childCount/10);
  for(var i = 1; i<pageCount; i++){
    var a = document.createElement('a');
    var prevPageNum = document.getElementById("searchPage"+i);
    a.innerHTML = i+Number(1);
    a.href = "#"+(i+Number(1));
    a.style.marginLeft = "5px";
    insertAfter(a,prevPageNum);
  }
  document.getElementById("searchNumPages").innerHTML = "Viewing page 1 of " + pageCount + " (" + childCount + " Results)";

  // Display Only 10
  var childrenElements = document.getElementById("searchResults").children;
  if(childCount>10){
    for(var j = 9; j<childCount-Number(1); j++){
      childrenElements[j].style.display = "none";
    }
  }
}

function refineSearch(){
  var childCount = document.getElementById("searchResults").childElementCount;
  childCount--;
  var lowPrice = document.getElementById("priceRangeSearchMin");
  var highPrice = document.getElementById("priceRangeSearchMax");
  var hotelStar = document.getElementById("hotelStarsSearch");
  var userStar = document.getElementById("userRatingSearch");
  var location = document.getElementById("locationSearch");
  var childrenElements = document.getElementById("searchResults").children;
  for(var i = 0; i<childCount-Number(1); i++){
    childrenElements[i].style.display = "block";
    if(childrenElements[i]){

    }
  }
}

function resetFilters(){

}

function roomNumber() {
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  roomChoice = unescape(temp[1]);
  document.getElementById("room").innerHTML = roomChoice;
}


function addHotel(){
console.log("hello there")
}

function checkHotel1(){
    fade('pop1');
}

function fade(sender) {
    var element = document.getElementById(sender);
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function checkHotel2(){
    console.log("hello there")
    document.getElementById('pop2').style.display='block'; 
}

function loadPreview(sender) {
console.log(sender);
var element = document.getElementById(sender);
if(element.style.opacity == "0.6"){
    element.style.opacity = "1";
}else{
    element.style.opacity = "0.6";
}
element.style.filter  = 'alpha(opacity=90)'; 
}