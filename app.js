const express = require("express");
const bodyParser = require("body-parser");
const date = require(express.static( __dirname+"\\date.js"));
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shivansh:xmtjk2w288@cluster0.onbja.mongodb.net/todolistDB?retryWrites=true&w=majority", { useNewUrlParser: true,
   useUnifiedTopology: true });
const itemSchema = {
  name: String
};
const listSchema = {
  name: String,
  items: [itemSchema]
};
const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);
// var items = [];
// var workItems = [];

const item1 = new Item({
  name: "Office"
});
const item2 = new Item({
  name: "Home"
});
//var defaultItems = [];



app.get("/", function(req, res){
  Item.find({}, function(err, items){
    defaultItems = [];
    if(err){
      console.log(err);
    }
    else{
      console.log("Showing Home route");
      items.forEach(function(item){
        defaultItems.push(item);
      });
      // Item.insertMany(defaultItems, function(err){
      //   if(err){
      //     console.log(err);
      //   }
      //   else{
      //     console.log("Saved Successfully");
      //   }
      // });
    }
    let day = date.getDay();
    res.render("list",{listTitle:day, newListItems:defaultItems});
  });

});
app.get("/:customList", function(req, res){
  const customListName = _.capitalize(req.params.customList);

  List.findOne({name: customListName}, function(err, foundList){
  //  if(!err){
      if(!foundList){
        //Createlist and enter
        listi = new List({
          name: customListName,
          items: []
        });
        listi.save(function(err){
          if(err){
            console.log(err);
          }
        });
        res.render("list",{listTitle:customListName, newListItems:listi.items});
      }
      else{
        res.render("list",{listTitle:customListName, newListItems:foundList.items});
        //display existing list
      }
  //  }
  });

});

app.post("/",function(req, res){
let item = req.body.newItem;
let title = req.body.list;

itemi = new Item({
  name: item
});
if(title === date.getDay()){
  console.log("Saving in root list");
  itemi.save();
  res.redirect("/");


        //display existing list
      }
      else{
        console.log(title, date.getDay());
        List.findOne({name: title}, function(err, foundItemList){
          if(foundItemList){
              foundItemList.items.push(itemi);
              foundItemList.save();
              res.redirect("/"+title);
      }
  });
}
// if(req.body.list === "Work List"){
//   workItems.push(item);
//   res.redirect("/work");
// }
// else{
//   items.push(item);
//   res.redirect("/");
// }
});

// app.get("/work", function(req, res){
//   res.render("list",{listTitle:"Work List", newListItems:workItems});
// });
// app.post("/work", function(req, res){
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });
app.get("/about", function(req,res){
  res.render("about");
});

app.post("/delete", function(req, res){
  let checkedItem = req.body.checkbox;
  let listName = req.body.listName;
  //console.log(checkedItem);
  if(listName === date.getDay()){
  Item.findByIdAndRemove(checkedItem, function(err){
    if(err){
      console.log(error);
    }
    else{
      console.log("One item deleted from list/database");
    }
  });
  res.redirect("/");}
  else{
    List.findOneAndUpdate({name: listName}, {$pull :{items :{_id: checkedItem}}}, function(err, resultList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
  console.log("Server started on port" + port);
});
