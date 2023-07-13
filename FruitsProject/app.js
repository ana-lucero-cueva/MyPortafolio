
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB',{useNewUrlParser:true,useUnifiedTopology: true});

//create a SCHEMA that sets out the fields each document will have and their datatypes
const fruitSchema = new mongoose.Schema ({
	name: {
    type:String,
    required:[true,"Please check your dat entry, no name specified!"]
  },
	rating: {
    type: Number,
    min:1,
    max:10
  },
	review: String
});

//create a MODEL
const Fruit = new mongoose.model ("Fruit", fruitSchema)

//create a DOCUMENT
const fruit = new Fruit ({
	name: "Peach",
	rating: 9,
	review: "Great Fruit!"
});

// const kiwi = new Fruit ({
// 	name: "Kiwi",
// 	rating: 10,
// 	review: "The best!"
// });
// const strawberries = new Fruit ({
// 	name: "Strawberries",
// 	rating: 10,
// 	review: "The best of all!"
// });
// const orange = new Fruit ({
// 	name: "Orange",
// 	rating: 10,
// 	review: "The worst!"
// });



// Fruit.insertMany([kiwi,orange,strawberries]).then(function () {
//   console.log("Successfully saved defult items to DB");
// }).catch(function (err) {
//   console.log(err);
// });

Fruit.find().then(function(fruits){

  mongoose.connection.close();
  fruits.forEach(function(fruit){
  console.log(fruit.name);
  })
}).catch(function(err){
  console.log(err);
});


// Fruit.updateOne({_id:"6475e257ec140df9d0c541b7"},{name:"Watermelon" }, function(err){
//   if(err){console.log(err);} else {console.log("Succesfully updated the document");}
//   });


// Fruit.updateOne({_id:"6475e257ec140df9d0c541b7"}, { name:"Watermelon"}).then(result => {
//   console.log(result)
// });

//save the document
//fruit.save()

//**CHALLENGE: Set up a people database with one document and two fields**//
//create a SCHEMA
const pineapple = new Fruit ({
	name: "Pineapple",
	rating: 10,
	review: "Excellent Fruit!"
});
//  pineapple.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

//create a MODEL
const Person = mongoose.model('Person', personSchema);

//create a DOCUMENT
const person = new Person({
  name: "Ana",
  age: 22,
  favoriteFruit: pineapple
});

//Save it
person.save();