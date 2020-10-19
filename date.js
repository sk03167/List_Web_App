module.exports.getDate = getDate;

// another way of declaring function
// var getDate = function(){
//
// }
// and also we can do this
// module.exports.getDate = function(){
//
// }
function getDate(){
var today = new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

day = today.toLocaleDateString("en-US", options);
return day;
}
module.exports.getDay = getDay;
function getDay(){
var today = new Date();

var options = {
  weekday: "long",
};

day = today.toLocaleDateString("en-US", options);
return day;
}
// switch(today.getDay()){
//   case 0:
//   day = "Sunday";
//   break;
//
//   case 1:
//   day = "Monday";
//   break;
//
//   case 2:
//   day = "Tuesday";
//   break;
//
//   case 3:
//   day = "Wednesday";
//   break;
//
//   case 4:
//   day = "Thursay";
//   break;
//
//   case 5:
//   day = "Friday";
//   break;
//
//   case 6:
//   day = "Saturday";
//   break;
//
//   default:
// }
