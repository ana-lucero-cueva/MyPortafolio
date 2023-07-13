const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended :true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    res.send(num1+num2);
});


app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html")
});

app.post("/bmiCalculator.html",function(req,res){
    var weight=parseFloat(req.body.weight);
    var heigth=parseFloat(req.body.heigth);
    res.send("Your BMI in "+weight/(heigth*heigth))
});

app.listen(3000,function(){
    console.log("Server is running on port 3000")
});