const app = require('./app');
const db = require('./config/db');
const UserModel = require('./models/user.model');
const cors = require('cors');
const express = require('express');



const port =  3000;

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{        
        res.send("Connection success");
    });
app.listen( port,()=>{
        console.log('Connecting to the server on port http://localhost:',port);
    });