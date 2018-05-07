var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/',function(req,res){
   res.cookie('bookingStatus','false');
    res.end('Hello');
});

app.listen(3000,function() {
    console.log('Yeah?')
})

function confirmedBooking() {
document.cookie = ("bookingStatus=true");
}

function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
function bookingCancelled(){
    document.cookie = ("bookingStatus=false");
}