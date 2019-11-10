let mongoose = require("mongoose");
let Schema = mongoose.Schema;



let CommentsSchema = new Schema({
  id: {type:String,required:true},
  parent_id : {type:String,required:false},  
  post_endpoint : {siteURL:{type:String,required:true},postURL:{type:String,required:true}},
  author: {
    uid:{type:String,required:true},
    names:{type:String},
    tags:Array,
    job:String,
    description: String,
    avatar:String
  },
  comment: {type:String,required:true},
  tags:{type:Array},
  timestamp: {type:Date, 'default': Date.now}
});

module.exports = CommentsSchema;
