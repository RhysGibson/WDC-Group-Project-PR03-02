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
  initSearch();
}

function refineSearch(){
  /*
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
  }*/
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
console.log("hello there");
}
function loadLogin(){
    fadeLogin('outerLayer');
}

function checkHotel1(){
    fade('pop1');
}

function closePopUp(sender){
element = document.getElementById(sender);
element.style.display='none';
element.style.opacity = 0.1
}

function fade(sender) {
    var element = document.getElementById(sender);
    console.log(element);
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

function fadeLogin(sender) {
    var element = document.getElementById(sender);
    console.log(element);
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
    console.log("hello there");
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

function goToMap(){
  location.href = "mapSearch.html?search=" + document.getElementById('searchReq').value;
}

function goToSearch(){
  location.href = "search.html?search=" + document.getElementById('searchReq').value;
}

function goToSearchIndex(){
  location.href = "/files/search.html?search=" + document.getElementById('searchReq').value;
}

// Taken from Online - May use NPM for Querystrings later
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initSearch(){
  var v1 = getParameterByName("search");
  console.log(v1);
  document.getElementById('searchReq').value = v1;
}

function goToLogin(){
  location.href="loginScreenV1.html";
}

function goToLoginIndex(){
  location.href="/files/Login Screen V1.html";
}

function goToOverview(){
  location.href="hotelOverview.html";
}

function changeCookie() {
res.cookie('myFirstCookie', 'false');
}

function onSignIn(googleUser){
document.cookie = ("loggedIn=true");
var profile = googleUser.getBasicProfile();
document.cookie = ("name" + "=" + profile.getName());
$(".data").css("display","block");
$("#pic").attr('src',profile.getImageUrl());
$("#email").text(profile.getEmail());
    document.location = "/files/myAccount.html"
}

function onSignIn1(googleUser){
var profile = googleUser.getBasicProfile();
    //var cookie = "bookingStatus" + "=" + profile.getName() + ";";
document.cookie = ("name" + "=" + profile.getName());
$(".data").css("display","block");
$("#pic").attr('src',profile.getImageUrl());
$("#email").text(profile.getEmail());
$("#profileName").text("Welcome " + profile.getName());
}

function signOut() {
    document.cookie = ("loggedIn=false");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        alert("You have been signed out");
        $("g-signin2").css("display","block");
        $(".data").css("display","block");
    });
}

function accountCheck() {
if(getCookie("loggedIn") == "true"){
console.log("LoggedIn");
    document.getElementById("logInButton").style.display = "none";
    document.getElementById("accountName").style.display = "initial";
    document.getElementById("accountName").textContent = "Your account";
    console.log(getCookie(name));
}else{
    console.log("Not Logged In");
    }
}
