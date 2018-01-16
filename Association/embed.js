var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo",{
  useMongoClient: true,
  /* other options */
});

var postSchema = new mongoose.Schema({
   title : String,
   content : String
});

var Post = mongoose.model("Post",postSchema);
//USER - email name

var userSchema = new mongoose.Schema({
   email : String, 
   name : String,
   posts:[postSchema]
   
});

var User = mongoose.model("User",userSchema);

// var newUser = new User({
//   email :"jjffff@j.com",
//   name :"joy"
// });



// newUser.posts.push({
//     title:"how to",
//     content:"llalalalal"
// });


User.findOne({name:"joy"},function(err,user){
    if(err){
      
    }else{
        user.posts.push({
            title:"jhahahahah",
            content :"hahahahhahahah"
        });
        user.save(function(err,user){
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});



// newUser.save(function(err,user){
//   if(err){
//       console.log(err);
//   } else{
//       console.log(user);
//   }
// });


// var newPost = new Post({
//   title : "it's awesome",
//   content : "lalalalalallalalalla"
// });


// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// })