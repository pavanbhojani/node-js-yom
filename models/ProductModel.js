const mongoose = require("mongoose");


const schema = mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    price :{
        type : String,
        required : true,
    },
    qty :{
        type :  String,
        required : true,
    },
    // avatar :{
    //     type : String,
    //     required : true,
    // },

    status : {
        type :Number,
        default : 1
    }
});

module.exports = mongoose.model("Product",schema);