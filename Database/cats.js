var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperature:String
});

var Cat = mongoose.model("Cat",catSchema);

//add a new cat

Cat.create({
    name:"vivi",
    age:10,
    temperature:"nice"
},function(err,cat){
    if(err){
        console.log("there is error");
        console.log(err);
    }else{
        console.log(cat);
    }
});




// var joy1 = new Cat({
//     name:"joy2",
//     age:"18",
//     temperature:"normal"
// });

// joy1.save(function(err,cat){
//     if(err){
//         console.log("there is error");
//     }else{
//         console.log("it's fine");
//         console.log(cat);
        
//     }
// });


//retreive

Cat.find({},function(err,cats){
   if(err){
       console.log("errrrrors");
       console.log(err);
   } else{
       console.log("all the cats here....");
       console.log(cats);
   }
});