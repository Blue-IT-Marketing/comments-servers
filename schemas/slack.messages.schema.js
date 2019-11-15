let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const SlackMessagesSchema = new Schema({
    channel_id : {type: String,required:true},
    thread_id : {type:String, required:true},
    message_id : {type:String,required:true},
    message : {type:String,required:true},
    timestamp : {type : Date,required:true}
});


module.exports = SlackMessagesSchema;