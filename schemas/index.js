let mongoose = require("mongooose");

exports.Comments = mongoose.model("Comments", require("./CommentsSchema"));
