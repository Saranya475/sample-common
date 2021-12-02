var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


// app.get("/login",function(req,res)
// {
// res.send("login api");
// });

// app.get("/memberlist",function(req,res)
// {
// res.send("memberlist api");
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
var worklist = function (req, res) {
  return "test worklist";
}

module.exports={
  login
}
// module.exports = class Square {
//   constructor(width) {
//     this.width = width;
//   }

//   area() {
//     return this.width ** 2;
//   }
// };

