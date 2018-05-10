var express = require('express');
var router = express.Router();

var fs = require('fs');
var reviews = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

fs.readFile('data/reviews.json', 'utf8', function(err, data){
  reviews = JSON.parse(data);
})

router.get('/reviews.json', function(req, res, next) {
  var number = Number(req.query.hotelid);
  /*
  var request = [];
  // Compare hotel ID with the Review
  for(var i=0;i<reviews.length;i++){
    console.log(reviews[i].hotelid);
    console.log(number);
    if(reviews[i].hotelid == number){
      request.push(reviews[i]);
    }
  }*/
  res.send(JSON.stringify(reviews));
});

router.post('/addReview.json', function(req,res) {
  console.log(req.body.text);
  reviews.push({hotelid: req.body.hotelid, postid: req.body.postid, user: req.body.user, date: req.body.date, text: req.body.text, likes: 0, dislikes: 0, rating: req.body.rating, parent: req.body.parent});
  res.send(JSON.stringify(reviews));
});

module.exports = router;
