//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const mongoose=require("mongoose");

// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/crud",{useNewUrlParser:true});

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

// using mongo and mongoose

const listItems=({
  name:{
    type:String,
    required:true
  }
});

const Item=mongoose.model("Item",listItems);

const Document=async()=>{

try{
const item1=new Item({
  name:"Welcome to your To Do List"
});
const item2=new Item({
  name:"Hit the + t add a new item"
});
const item3=new Item({
  name:"<--Hit this to delete an item"
});


const defaultItems=[item1,item2,item3];

// Item.insertMany(defaultItems).then(function(){
//   console.log("Successfully saved to DB")
// })
//   .catch(function(err){
//     console.log(err);
//   });

await Item.insertMany([item1,item2,item3]);
console.log("Success");}
catch{
    console.log(err);
}
}
Document();


app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: Today, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});