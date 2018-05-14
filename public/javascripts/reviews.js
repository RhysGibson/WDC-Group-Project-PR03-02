var reviews = [];
var globalpost = 0;

function initReviews(){
  if(getCookie("loggedIn") == "true"){
    document.getElementById('reviewBox').disabled = false;
    document.getElementById('reviewButton').disabled = false;
    document.getElementById('leaveUsReview').innerHTML = "Leave us a Review!";
  }
  var xhttp = new XMLHttpRequest();

  var container = document.getElementById('reviewsContainer');

  xhttp.onreadystatechange = function() {
    reviews = JSON.parse(xhttp.responseText);
    console.log(reviews);

    for(var k=0;k<reviews.length;k++){
      globalpost++;
      var reviewText = reviews[k].text;
      var reviewRate = reviews[k].rating;

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
      var text = document.createElement("p");
      var reply = document.createElement("a");
      var report = document.createElement("a");
      username.innerHTML = "<b>"+reviews[k].username+"</b>";
      likes.innerHTML = reviews[k].likes;
      dislikes.innerHTML = reviews[k].dislikes;
      date.innerHTML = "Posted on: "+reviews[k].date;
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
      if(getCookie("name")==reviews[k].username){
        var edit = document.createElement("a");
        edit.innerHTML = '<i class="fa fa-edit"></i> Edit';
        edit.href = "#edit";
        newReview.appendChild(edit);
      }
      newReview.appendChild(hr3);

      container.appendChild(newReview);

    }
  };

  xhttp.open("GET", "/reviews.json?hotelid=0", false);

  xhttp.send();
}

function submitReview(hotel){
  globalpost++;
  var xhttp = new XMLHttpRequest();
  var d = new Date();

  var dateFormat = d.getDate() + "/" + Number(d.getMonth()+1) + "/" + d.getFullYear();

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

  xhttp.send(JSON.stringify({hotelid:hotel,postid:globalpost,username:getCookie("name"),date:dateFormat,text:revtext.innerHTML,likes:0,dislikes:0,rating:reviewRate,parent:0}));
}
