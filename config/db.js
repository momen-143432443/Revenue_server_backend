const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/revUsers').on('Open',()=>{
    console.log('Mongo active');
}).on('error',()=>{
    console.log('Mongo error');
});

module.exports = connection;