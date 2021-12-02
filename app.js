var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
const router = require('express').Router();
const REDIS_PORT = Number(process.env.REDIS_PORT);
const REDIS_HOST= process.env.REDIS_HOST
console.log("**************printing export things*******************");
console.log(REDIS_PORT);
console.log(REDIS_HOST);
router.get("/login",function(req,res)
{
res.send("login api");
});

router.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});

module.exports = router;

