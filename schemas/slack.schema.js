let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const ChannelSchema = new Schema({
    channel_id : {type:String,required:true},
    channel_name : {type:String,required:true},
    private : {type:Boolean,required:true},

})


module.exports = ChannelSchema;