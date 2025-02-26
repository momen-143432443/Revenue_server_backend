const experss = require("express");
const body_Parser = require("body-parser");
const userRouter = require('./route/user.route');


const app = experss();
app.use(body_Parser.json());
app.use('/',userRouter);

module.exports = app;