const experss = require("express");
const body_Parser = require("body-parser");
const userRouter = require('./route/user.route');
const productRoute = require('./route/product.route');
const cors = require('cors');


const app = experss();
app.use(body_Parser.json());
app.use('/',userRouter);
app.use('/',productRoute);
app.use(cors());


module.exports = app;