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
  document.getElementById("hotelStarsText").innerHTML = document.getElementById("hotelStarsSearch").value;
}

function getUserRatingSearch(){
  document.getElementById("userRatingText").innerHTML = document.getElementById("userRatingSearch").value;
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
