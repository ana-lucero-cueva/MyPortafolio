
const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser:true,useUnifiedTopology: true});

const itemsSchema = new mongoose.Schema ({
  name:String

});

const Item = new mongoose.model ("Item", itemsSchema)

const item1 = new Item ({
  name: "Welcome to your to do list"
});
const item2 = new Item ({
  name: "Hit the + button to add a new item. "
});
const item3 = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems=[item1,item2,item3];


const listSchema = new mongoose.Schema ({
  name:String,
  items: [itemsSchema]
});

const List = new mongoose.model ("List", listSchema)


app.get("/", function(req, res) {

  Item.find().then(function(foundItems){
    if (foundItems.length==0){

      Item.insertMany(defaultItems).then(function () {
        console.log("Successfully saved defult items to DB");
      }).catch(function (err) {
        console.log(err);
      });

      res.redirect("/");

    }else{
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }

    foundItems.forEach(function(item){
    console.log(item.name);
    })
  }).catch(function(err){
    console.log(err);
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;


  const item = new Item ({
    name: itemName
  });

  if(listName=="Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName})
    .then(function(foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
    .catch(function(err){
      console.log(err);
    });
  }

});

app.post("/delete", function(req,res){
  const checkItemId= req.body.checkbox;
  const listName=req.body.listName;

  if(listName=="Today"){
    Item.findByIdAndRemove(checkItemId)
    .then(function () {
    console.log("Successfully removed");
    })
    .catch(function (err) {
      console.log(err);
    });
    res.redirect("/");

  }else{

    List.findOneAndUpdate(
      { name:listName },
      {$pull:{items: {_id:checkItemId}}},
      { new: true }
     )
      .then( res.redirect("/"+listName))
      .catch(err => res.status(400).json(err));
  }

});

app.get("/:customListName", function(req,res){
  const customListName=_.capitalize(req.params.customListName);

  List.findOne({name:customListName}).then(function(foundList){
    if(!foundList)
    {
      //Create a new List
      const list = new List ({
        name: customListName,
        items: defaultItems
      });
      list.save();
      res.redirect("/"+customListName);
    }else{
      //Show an existing list
      res.render("list",{listTitle: foundList.name, newListItems: foundList.items})
    }


    }).catch(function(err){
    console.log(err);
  });


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
