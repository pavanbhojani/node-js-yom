const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/final_exam");

const db = mongoose.connection;

db.on('err',console.error.bind(console,"database not connected"));

db.once('open',(err)=>{
    if(err){
        console.log("database not start");
        return false;
    }
    console.log("database start");
})

module.exports = db;