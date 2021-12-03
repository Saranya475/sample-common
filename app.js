var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const axios = require('axios');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
const connectDB = require("./database/initi");
const edgeDb=require("./database/edgecommon");

const router = require('express').Router();

// connectDB();

global.functions = require('./common/function.js');
const instance = axios.create({
    timeout: 0,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    baseURL: process.env.KOPS_BASE_URL
  });
router.get("/login",async function(req,res)
{
    console.log("**************printing export things*******************");
    console.log(process.env.REDIS_PORT);
    console.log(process.env.REDIS_HOST);
    console.log(process.env.CHECK);
    const res1=await edgeDb.getValue("sara");
res.send({"count":res1});
});

router.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});

// app.listen(3002, function () {
//     console.log('Example app listening on port 3002!');
//   });
module.exports = router;

