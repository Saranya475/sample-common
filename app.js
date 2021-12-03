var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const axios = require('axios');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
const router = require('express').Router();
global.functions = require('./common/function.js');
const instance = axios.create({
    timeout: 0,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    baseURL: process.env.KOPS_BASE_URL
  });
router.get("/login",function(req,res)
{
    console.log("**************printing export things*******************");
    console.log(process.env.REDIS_PORT);
    console.log(process.env.REDIS_HOST);
    console.log(process.env.CHECK);
res.send("login api");
});

router.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});

module.exports = router;

