var reviews = [];
var overviewHotel = [];

function initOverview(){
  // Set Text
  var hotelid = getParameterByName("hotelid");
  var datein = getParameterByName("datein");
  var d1 = Date.parse(datein);
  var date1 = new Date(d1);
  var dateFormat1 = date1.getDate() + "/" + Number(date1.getMonth()+1) + "/" + date1.getFullYear();
  var dateout = getParameterByName("dateout");
  var d2 = Date.parse(dateout);
  var date2 = new Date(d2);
  var dateFormat2 = date2.getDate() + "/" + Number(date2.getMonth()+1) + "/" + date2.getFullYear();

  if(datein != "" && dateout != ""){
    document.getElementById("checkin").innerHTML = "Check-In/Check-Out: "+dateFormat1+" - "+dateFormat2;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    overviewHotel = JSON.parse(xhttp.responseText);
    document.getElementById("hotelname").innerHTML = overviewHotel[0].hotelname;
    document.getElementById("extendedDescription").innerHTML = overviewHotel[0].extendeddescription;
    document.getElementById("overviewBook").innerHTML = "Book Now ($"+overviewHotel[0].hotelcost+")";
    var userrating = document.getElementById("userRating");
    var hotelrating = document.getElementById("hotelRating");
    userrating.innerHTML = "";
    hotelrating.innerHTML = "";
    for(var i=0;i<overviewHotel[0].userrating;i++){
      userrating.innerHTML += '<i class="fa fa-star"></i>';
    }
    for(var i=0;i<overviewHotel[0].hotelrating;i++){
      hotelrating.innerHTML += '<i class="fa fa-star"></i>';
    }
  }

  xhttp.open("GET", "/hotels.json?hotelid="+hotelid, false);

  xhttp.send();
}

function initReviews(){
  var hotelid = getParameterByName("hotelid");
  if(session[0].userid != "-1"){
    document.getElementById('reviewBox').disabled = false;
    document.getElementById('reviewButton').disabled = false;
    document.getElementById('leaveUsReview').innerHTML = "Leave us a Review!";
  } else {
    document.getElementById('reviewBox').disabled = true;
    document.getElementById('reviewButton').disabled = true;
  }
  var xhttp = new XMLHttpRequest();

  var container = document.getElementById('reviewsContainer');

  xhttp.onreadystatechange = function() {
    reviews = JSON.parse(xhttp.responseText);

    for(var k=0;k<reviews.length;k++){
      var reviewText = reviews[k].reviewtext;
      var reviewRate = reviews[k].rating;
      var d = Date.parse(reviews[k].dateposted);
      var date = new Date(d);
      var dateFormat = date.getDate() + "/" + Number(date.getMonth()+1) + "/" + date.getFullYear();

      var br = document.createElement("br");
      var br2 = document.createElement("br");
      var br3 = document.createElement("br");
      var hr = document.createElement("hr");
      var hr2 = document.createElement("hr");
      var hr3 = document.createElement("hr");
      var likeDiv = document.createElement("div");
      var upButton = document.createElement("button");
      var downButton = document.createElement("button");

      upButton.className = "reviewThumbs";
      upButton.innerHTML = '<i class="fa fa-thumbs-up"></i>';
      upButton.style.color = "green";

      downButton.className = "reviewThumbs";
      downButton.innerHTML = '<i class="fa fa-thumbs-down"></i>';
      downButton.style.color = "red";


      likeDiv.appendChild(upButton);
      likeDiv.appendChild(downButton);

      var newReview = document.createElement("div");
      newReview.className = "review";

      var username = document.createElement("span");
      var date = document.createElement("span");
      date.style.color = "blue";
      date.style.marginLeft = "10px";
      var likes = document.createElement("span");
      likes.style.color = "green";
      likes.setAttribute("id","reviewlike"+reviews[k].reviewid);
      var dislikes = document.createElement("span");
      dislikes.style.color = "red";
      dislikes.style.marginLeft = "10px";
      dislikes.setAttribute("id","reviewdislike"+reviews[k].reviewid);
      var rating = document.createElement("span");
      var text = document.createElement("p");
      var reply = document.createElement("a");
      var report = document.createElement("a");
      username.innerHTML = "<b>"+reviews[k].firstname+" "+reviews[k].lastname+"</b>";
      likes.innerHTML = reviews[k].likes;
      dislikes.innerHTML = reviews[k].dislikes;
      date.innerHTML = "Posted on: "+dateFormat;
      rating.innerHTML = "Rating: ";
      text.innerHTML = reviewText;

      for(var i=0;i<reviewRate;i++){
        rating.innerHTML += '<i class="fa fa-star"></i>';
      }

      reply.innerHTML = '<i class="fa fa-reply"></i> Reply';
      reply.href = "#reply";
      reply.style.marginRight = "15px";
      report.innerHTML = '<i class="fa fa-flag"></i> Report';
      report.href = "#report";
      report.style.marginRight = "15px";

      newReview.appendChild(br);
      newReview.appendChild(hr);
      newReview.appendChild(likeDiv);
      newReview.appendChild(username);
      newReview.appendChild(date);
      newReview.appendChild(br2);
      newReview.appendChild(likes);
      newReview.appendChild(dislikes);
      newReview.appendChild(br3);
      newReview.appendChild(rating);
      newReview.appendChild(text);
      newReview.appendChild(hr2);
      newReview.appendChild(reply);
      newReview.appendChild(report);
      if(session[0].userid==reviews[k].userid){
        var edit = document.createElement("a");
        edit.innerHTML = '<i class="fa fa-edit"></i> Edit';
        edit.href = "#edit";
        newReview.appendChild(edit);
      }
      newReview.appendChild(hr3);

      container.appendChild(newReview);

    }
  };

  xhttp.open("GET", "/reviews.json?hotelid="+hotelid, false);

  xhttp.send();
}

function submitReview(hotel){
  var xhttp = new XMLHttpRequest();
  var d = new Date();

  var dateFormat = d.getDate() + "/" + Number(d.getMonth()+1) + "/" + d.getFullYear();
  var dateSend = Number(d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  console.log(dateSend);

  var container = document.getElementById('reviewsContainer');
  var reviewText = document.getElementById('reviewBox').value;
  var reviewRate = document.getElementById('reviewRating').value;
  var usernameText = getCookie("name");

  var br = document.createElement("br");
  var br2 = document.createElement("br");
  var br3 = document.createElement("br");
  var hr = document.createElement("hr");
  var hr2 = document.createElement("hr");
  var hr3 = document.createElement("hr");
  var likeDiv = document.createElement("div");
  var upButton = document.createElement("button");
  var downButton = document.createElement("button");

  upButton.className = "reviewThumbs";
  upButton.innerHTML = '<i class="fa fa-thumbs-up"></i>';
  upButton.style.color = "green";
  downButton.className = "reviewThumbs";
  downButton.innerHTML = '<i class="fa fa-thumbs-down"></i>';
  downButton.style.color = "red";

  likeDiv.appendChild(upButton);
  likeDiv.appendChild(downButton);

  var newReview = document.createElement("div");
  newReview.className = "review";

  var username = document.createElement("span");
  var date = document.createElement("span");
  date.style.color = "blue";
  date.style.marginLeft = "10px";
  var likes = document.createElement("span");
  likes.style.color = "green";
  var dislikes = document.createElement("span");
  dislikes.style.color = "red";
  dislikes.style.marginLeft = "10px";
  var rating = document.createElement("span");
  var revtext = document.createElement("p");
  var reply = document.createElement("a");
  var report = document.createElement("a");
  var edit = document.createElement("a");
  username.innerHTML = "<b>"+usernameText+"</b>";
  likes.innerHTML = "0";
  dislikes.innerHTML = "0";
  date.innerHTML = "Posted on: "+dateFormat;
  rating.innerHTML = "Rating: ";
  revtext.innerHTML = reviewText;
  for(var i=0;i<reviewRate;i++){
    rating.innerHTML += '<i class="fa fa-star"></i>';
  }
  reply.innerHTML = '<i class="fa fa-reply"></i> Reply';
  reply.href = "#reply";
  reply.style.marginRight = "15px";
  report.innerHTML = '<i class="fa fa-flag"></i> Report';
  report.href = "#report";
  report.style.marginRight = "15px";
  edit.innerHTML = '<i class="fa fa-edit"></i> Edit';
  edit.href = "#edit";

  newReview.appendChild(br);
  newReview.appendChild(hr);
  newReview.appendChild(likeDiv);
  newReview.appendChild(username);
  newReview.appendChild(date);
  newReview.appendChild(br2);
  newReview.appendChild(likes);
  newReview.appendChild(dislikes);
  newReview.appendChild(br3);
  newReview.appendChild(rating);
  newReview.appendChild(revtext);
  newReview.appendChild(hr2);
  newReview.appendChild(reply);
  newReview.appendChild(report);
  newReview.appendChild(edit);
  newReview.appendChild(hr3);

  container.appendChild(newReview);
  xhttp.open("POST", "/addReview.json", true);

  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify({hotelid:hotel,userid:2,dateposted:dateSend,reviewtext:revtext.innerHTML,likes:0,dislikes:0,rating:reviewRate,parent:0}));
}

function likeReview(review,like){
  if(like){
    var liketext = document.getElementById('reviewlike'+review).innerHTML;
  } else{
    var liketext = document.getElementById('reviewdislike'+review).innerHTML;
  }
  var xhttp = new XMLHttpRequest();

  liketext = Number(liketext) + Number(1);

  xhttp.open("POST", "/likeReview.json", true);

  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify({reviewid:review,like:like}));
}
