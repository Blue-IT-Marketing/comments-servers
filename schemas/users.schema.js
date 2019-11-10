let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  uid: {type:String,required:true},
  names : {type:String,required:true},
  tags:Array,
  job:String,
  description: String,
  avatar:String,
  lastlogin: {type:Date, 'default': Date.now}  
});

module.exports = UserSchema;
