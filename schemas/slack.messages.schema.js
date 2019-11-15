let mongoose = require("mongoose");
let Schema = mongoose.Schema;


const SlackMessages = new Schema({
    channel_id : {type: String,required:true},
    thread_id : String,
    message_id : {type:String,required:true},
    message : {type:String,required:true},
    timestamp : {type : Date,required:true}
});


modules.exports = SlackMessages;