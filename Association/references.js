var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2",{
  useMongoClient: true,
  /* other options */
});


var Post = require("./models/post");
var User = require("./models/user");


Post.create({
  title:"how to cook best kimchi part4",
  content :"hjkhjkhjhkhhkh"
},function(err,post){
    User.findOne({email:"jovy@v.com"},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            });
        }
    });
    
 });

// //find user
// User.findOne({email:"jovy@v.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// })
// //find all post for user





