var express = require('express');
var router = express.Router();

var fs = require('fs');
var reviews = [];
var hotels = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*fs.readFile('data/reviews.json', 'utf8', function(err, data){
  reviews = JSON.parse(data);
})*/

fs.readFile('data/hotels.json', 'utf8', function(err, data){
  hotels = JSON.parse(data);
})

router.get('/reviews.json', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
    if(err){throw err;}
    var sql = "SELECT * from users inner join reviews on users.userid = reviews.userid WHERE hotelid = ?";
    var search_val = req.query.hotelid;
    connection.query(sql, [search_val], function(err, result, fields){
      if(err){throw err;}
      connection.release();
      res.json(result);
    });
  });

  /*
  var number = Number(req.query.hotelid);
  console.log(req.query.hotelid);
  var request = [];

  // Compare hotel ID with the Review
  for(var i=0;i<reviews.length;i++){
    if(reviews[i].hotelid == number){
      request.push(reviews[i]);
    }
  }

  res.send(JSON.stringify(request));*/
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

/*
router.post('/addCustomer', function(req,res) {
  var data = req.body;
  req.pool.getConnection(function(err, connection){
    if(err) throw err;
    var sql = "INSERT INTO users (lastName, firstName, email, password, country) VALUES ";
    connection.query(sql, function(err, results){
      connection.release();
    });
  });
  res.send(JSON.stringify(reviews));
});*/

router.post('/addReview.json', function(req,res) {
  req.pool.getConnection(function(err, connection){
    if(err) {throw err;}
    var sql = "INSERT INTO reviews(hotelid, userid, dateposted, reviewtext, likes, dislikes, rating, parentreview) VALUES (?,?,?,?,?,?,?,?)";
    var new_review = [
      req.body.hotelid, req.body.userid, req.body.dateposted, req.body.reviewtext, req.body.likes, req.body.dislikes, req.body.rating, req.body.parent
    ]
    connection.query(sql, new_review, function(err, result, fields){
      if (err){throw err;}
    });
  });
  res.send(JSON.stringify(reviews));
});

/* This doesn't work properly and for some reason completely breaks the code
router.post('/likeReview.json', function(req,res){
  req.pool.getConnection(function(err, connection){
    if(err) {throw err;}
    var sql;
    console.log(req.body.like);
    if(req.body.like){
      sql = "UPDATE reviews SET likes = likes+1 WHERE reviewid = ?";
    } else{
      sql = "UPDATE reviews SET dislikes = dislikes+1 WHERE reviewid = ?";
    }
    var review = req.body.reviewid;
    connection.query(sql, review, function(err,result,fields){
      if(err){throw err;}
    });
  });
})*/

// Not properly implemented yet
router.post('/addHotel.json', function(req,res) {
  hotels.push({hotelid: req.body.hotelid, name: req.body.name, cost: req.body.cost, additional: req.body.additional});
  res.send(JSON.stringify(hotels));
});

router.post('/editHotel.json', function(req,res) {
  for(var i=0;i<hotels.length;i++){
    if(req.body.hotelid==hotels[i].hotelid){
      hotels[i].name = req.body.name;
      hotels[i].description = req.body.description;
      hotels[i].cost = req.body.cost;
      hotels[i].rooms = req.body.rooms;
      hotels[i].deals = req.body.deals;
      hotels[i].additional = req.body.additional;
      console.log(hotels[i]);
      break;
    }
  }
  res.send(JSON.stringify(hotels));
});

module.exports = router;
