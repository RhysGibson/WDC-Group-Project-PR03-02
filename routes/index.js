var express = require('express');
var router = express.Router();

var fs = require('fs');
var reviews = [];
var hotels = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

fs.readFile('data/reviews.json', 'utf8', function(err, data){
  reviews = JSON.parse(data);
})

fs.readFile('data/hotels.json', 'utf8', function(err, data){
  hotels = JSON.parse(data);
})

router.get('/reviews.json', function(req, res, next) {
  var number = Number(req.query.hotelid);
  console.log(req.query.hotelid);
  var request = [];

  // Compare hotel ID with the Review
  for(var i=0;i<reviews.length;i++){
    if(reviews[i].hotelid == number){
      request.push(reviews[i]);
    }
  }

  res.send(JSON.stringify(request));
});

router.get('/hotels.json', function(req, res, next) {
  /*
  var number = Number(req.query.hotelid);
  var request = [];

  // Compare hotel ID with the Review
  for(var i=0;i<reviews.length;i++){
    if(reviews[i].hotelid == number){
      request.push(reviews[i]);
    }
  }*/

  res.send(JSON.stringify(hotels));
});

router.post('/addReview.json', function(req,res) {
  reviews.push({hotelid: req.body.hotelid, postid: req.body.postid, user: req.body.user, date: req.body.date, text: req.body.text, likes: 0, dislikes: 0, rating: req.body.rating, parent: req.body.parent});
  res.send(JSON.stringify(reviews));
});

router.post('/addHotel.json', function(req,res) {
  hotels.push({hotelid: req.body.hotelid, name: req.body.name, cost: req.body.cost, additional: req.body.additional});
  res.send(JSON.stringify(hotels));
});

module.exports = router;
