let mongoose = require("mongoose");
let Schema = mongoose.Schema;



let CommentsSchema = new Schema({

  id: {type:String,required:true},
  parent_id : {type:String,required:false},
  post_endpoint : {type:String,required:true},
  uid : {type:String,required:true},
  comment: {type:String,required:true},
  tags:{type:Array},
  timestamp: {type:Date, 'default': Date.now}
  
});

module.exports = CommentsSchema;
