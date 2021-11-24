
var express = require('express');
var app = express();
var cors = require("cors");
const path = require('path');
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
var fetch = require('node-fetch');
//import fetch from 'node-fetch';

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var port = 5002;
app.set('port', port);

app.get('/location_service',  async function (req, res, next){
    console.log("welcome");
    console.log("The request data is : ", req.query.ip_address);
    let access_key = "?access_key=9f9e98699825f57700ae4e9012a1a2af"
    let request_data = "?" +req.query.ip_address + "="+ access_key
    url = "http://api.ipstack.com/"+req.query.ip_address+access_key

    console.log("URL: ", url);
    let options = {
        "method":"get",
    }
    location = await fetch(url, options).then(res => res.json()).catch(
        e => {
            console.error({"message":"could not fetch", error:e});
        }
    );


    res.send(location);
});

app.get('/', function(req, res, next){
    console.log("homepage ");
    res.render("This the home page");

});



app.use(function(req, res, next){
    var err = new Error("404 - Not found");

    err.status(404);
    next(err);

});
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    console.log('500');

});
app.listen(app.get('port'), function(){
    console.log("Express started on http://localhost:"+ app.get('port'));
})
