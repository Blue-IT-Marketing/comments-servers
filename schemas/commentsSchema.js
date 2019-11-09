let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentsSchema = new Schema({
  id: String,
  parent_id : String,  
  post_endpoint : {siteURL:String,postURL:String},
  author: {uid:String,names:String},
  comment: String,
  timestamp: String
});

module.exports = CommentsSchema;
