const express=require("express");
const app =express();
app.get("/",function(req,res){
    res.send("<h1>Hello</h1>");
})
app.get("/contact",function(req,res){
    res.send("Contact me at: xx@gmail.com");
})
app.get("/about",function(req,res){
    res.send("My name is Ana");
})
app.get("/hobbies",function(req,res){
    res.send("Ice Cream");
})
app.listen(3000, function(){
    console.log("Server in port 3000")
});