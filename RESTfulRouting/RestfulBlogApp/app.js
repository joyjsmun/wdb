var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();
 
 


//app config
mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


//mongoose / model config
var blogSchema = new mongoose.Schema({
   title:String,
   image:String,
   body:String,
   created:{type:Date,default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

/*Blog.create({
    title:"Test doggie",
    image:"https://cdn.pixabay.com/photo/2017/11/30/16/45/dog-2988868_1280.jpg",
    body:"Is it nice?"
})
 */
 
 

 //RESTful routing
 
 
 app.get("/",function(req,res){
     res.redirect("/blogs");
 });
 
 app.get("/blogs",function(req,res){
     Blog.find({},function(err,blogs){
         if(err){
             console.log("oh~~~ errors");
         }else{
        res.render("index",{blogs:blogs}); 
             
         }
     })
     
     
 });
 
//  NEW Route
 app.get("/blogs/new",function(req,res){
    res.render("new") 
 });
 
 // Create Route
 app.post("/blogs",function(req,res){
    //create blogs

    req.body.blog.body = req.sanitize(req.body.blog.body)
  
    Blog.create(req.body.blog,function(err,newBlog){
       if(err){
           res.render("new");
       } else{
           res.redirect("/blogs");
       }
    });
    //redirect to the index
 });
 
 
//Show Route
app.get("/blogs/:id",function(req,res){
   Blog.findById(req.params.id,function(err,foundBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.render("show",{blog:foundBlog});
       }
   })
   
   
});
 
 app.get("/blogs/:id/edit",function(req,res){
     Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
        res.render("edit",{blog:foundBlog});
            
        }
     });
 });
 
 //update route
 app.put("/blogs/:id",function(req,res){
      req.body.blog.body = req.sanitize(req.body.blog.body)
   Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
      if(err){
          res.redirect("/blogs");
      } else{
          res.redirect("/blogs/"+req.params.id);
      }
   });
 });
 

//Destroy Route 
app.delete("/blogs/:id",function(req,res){
   //destroy
   Blog.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/blogs");
      } else{
          res.redirect("/blogs");
      }
   });
   //redirect
});
 
 app.listen(process.env.PORT,process.env.IP,function(){
     console.log("server is running");
 })