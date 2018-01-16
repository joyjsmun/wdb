var express = require('express');
var app = express();
var request = require('request');
app.set("view engine",'ejs');

app.get('/search',function(req,res){
   
   res.render("search"); 
});



app.get('/results',function(req,res){
     var searchTerm = req.query.search;
     var url = "http://omdbapi.com/?s=" + searchTerm + "&apikey=thewdb" ;
     
   request(url,function(error,response,body){
      if(!error&&response.statusCode == 200){
          var parsedMovie = JSON.parse(body);
           res.render("results",{parsedMovie:parsedMovie});
          
      } 
   });
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server got started");
});