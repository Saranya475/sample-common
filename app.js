var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.get("/login",function(req,res)
{
  console.log("login api called");
res.send("login api");
});

app.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});
// module.exports=
// }

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
//  });
// var login = function (req, res) {
//   return req.body;
// }
// var memberlist = function (req, res) {
//   return "memberlist api";
// }
// module.exports={
//   login,
//   memberlist
// }
// module.exports = class Square {
//   constructor(width) {
//     this.width = width;
//   }

//   area() {
//     return this.width ** 2;
//   }
// };

