var express = require('express');
var router = express.Router();

var fs = require('fs');
var hotels = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

fs.readFile('data/hotels.json', 'utf8', function(err, data){
  hotels = JSON.parse(data);
});

router.post('/login', function(req, res){
  function redirect(){
    if(req.session.userid){
      res.redirect("/files/home.html");
    } else{
      res.redirect("/files/loginScreenV1.html");
    }
  }
  req.pool.getConnection(function(err,connection){
    if(err){throw err;}
    var sql = "SELECT * from users";
    connection.query(sql, function(err, result, fields){
      if(err){throw err;}
      connection.release();
      for(var i=0;i<result.length;i++){
        if(req.body.email==result[i].email){
          if(req.body.password==result[i].password){
            req.session.userid=result[i].userid;
            req.session.firstname=result[i].firstname;
            req.session.lastname=result[i].lastname;
            req.session.email=result[i].email;
            req.session.manager=result[i].manager;
            req.session.country=result[i].country;
          } else{
            break;
          }
        }
      }
      redirect();
    });
  });
});

router.get('/files/account.html', function(req, res, next) {
  if(req.session.userid){
    res.redirect("/files/myAccount.html");
  } else{
    res.status(403);
    res.redirect("/files/loginScreenV1.html");
  }
});

router.get('/files/hotelManagement.html', function(req, res, next) {
  if(req.session.userid){
    if(req.session.manager == "1"){
      res.redirect("/files/manageHotels.html");
    } else{
      res.status(403).send("403 (Forbidden) - You must be a hotel manager to access this page.");
    }
  } else{
    res.status(403);
    res.redirect("/files/loginScreenV1.html");
  }
});

router.get('/files/hotelBookings.html', function(req, res, next) {
  if(req.session.userid){
    res.redirect("/files/manageBookings.html");
  } else{
    res.status(403);
    res.redirect("/files/loginScreenV1.html");
  }
});

router.get('/files/account.html', function(req, res, next) {
  if(req.session.userid){
    res.redirect("/files/myAccount.html");
  } else{
    res.status(403).send("403 (Forbidden)");
    res.redirect("/files/loginScreenV1.html");
  }
});

router.post('/signUp', function(req, res){
  function redirect(){
    if(req.session.userid){
      res.redirect("/files/account.html");
    }
  }
  req.pool.getConnection(function(err, connection){
    if(err) {throw err;}
    var sql = "INSERT INTO users(lastname,firstname,email,password,country,manager) VALUES (?,?,?,?,?,?)";
    var sendVal = 1;
    if(req.body.manager === null){
      sendVal = 0;
    }
    var new_user = [
      req.body.lastname, req.body.firstname, req.body.email, req.body.password, req.body.country, sendVal
    ]
    connection.query(sql, new_user, function(err, result, fields){
      if (err){throw err;}
      var logSql = "SELECT * from users where email = ?";
      connection.query(logSql, req.body.email, function(err, result2, fields2){
        if (err){throw err;}
        req.session.userid=result2[0].userid;
        req.session.firstname=result2[0].firstname;
        req.session.lastname=result2[0].lastname;
        req.session.email=result2[0].email;
        req.session.manager=result2[0].manager;
        req.session.country=result2[0].country;
        redirect();
      });
    });
  });
});

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
});

router.get('/bookings', function(req, res, next) {
  req.pool.getConnection(function(err,connection){
    if(err){throw err;}
    var sql = "SELECT user.firstname, user.lastname, user.email, bookings.bookingid, bookings.datein, bookings.dateout, bookings.roomnum, bookings.imagefile, bookings.cost, bookings.paymentfulfilled, hotel.name, hotel.latitude, hotel.longitude from users inner join bookings on users.userid = bookings.userid inner join hotels on hotels.hotelid = bookings.hotelid";
    var search_val = req.query.hotelid;
    connection.query(sql, [search_val], function(err, result, fields){
      if(err){throw err;}
      connection.release();
      res.json(result);
    });
  });
});

router.get('/inSession', function(req, res, next) {
  var sess=req.session;
  var session = [];
  if(sess.userid){
    session.push({userid:sess.userid,firstname:sess.firstname,lastname:sess.lastname,email:sess.email,manager:sess.manager,country:sess.country});
  } else{
    var nosess = "-1";
    session.push({userid:nosess});
  }
  res.send(JSON.stringify(session));
});

router.post('/signOut',function(req,res){
  req.session.destroy();
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
});

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
})

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
