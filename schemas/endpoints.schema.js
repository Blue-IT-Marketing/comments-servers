let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const EndpointSchema = new Schema({
    id : {type: String,required : true},
    uid : {type : String,required : true},
    siteURL:{type:String,required:true},
    postURL:{type:String,required:true},
    count : {type:Number,required:true}
});

module.exports = EndpointSchema;