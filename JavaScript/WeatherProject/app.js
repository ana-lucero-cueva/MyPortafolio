const express =require("express");
const https=require("https");
const bodyParser=require("body-parser")

const app =express();


app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){


     response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp= weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description;
            const icion=weatherData.weather[0].icon;
            res.write("<p>The weather is currently"+weatherDescription+"</p>");
            res.write("<hi>The temperature is"+temp+"</h1>");
            res.send();

        })
})



app.listen(3000,function(){
    console.log("Server is running on port 3000");
})