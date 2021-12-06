var express = require('express');
var app = express();
var bodyParser = require("body-parser");
// const connectDB = require("./initi");
const axios = require('axios');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const commonConstant=require("./database/constant");

const router = require('express').Router();



global.functions = require('./common/function.js');
const instance = axios.create({
    timeout: 0,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    baseURL: process.env.KOPS_BASE_URL
  });
  // connectDB();
router.get("/login",async function(req,res)
{ 
  console.log("login api");
  const res1=await commonConstant.getConstantValue("constant_VTB");
res.send(res1);
});

router.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});

// app.listen(3003, function () {
//     console.log('Example app listening on port 3003!');
//   });
module.exports = router;

