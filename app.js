var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
const router = require('express').Router();

router.get("/login",function(req,res)
{
res.send("login api");
});

router.get("/memberlist",function(req,res)
{
res.send("memberlist api");
});

module.exports = router;

