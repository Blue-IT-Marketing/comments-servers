let mongoose = require("mongoose");
const config = require("config");

mongoose.connect(process.env.MONGODB_URI || config.get("MONGODB_URI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to mongoose"));


module.exports = {
    Comments : mongoose.model("Comments", require("./comments.schema")),
    Users : mongoose.model("Users", require("./users.schema")),
    EndPoints : mongoose.model('EndPoints',require("./endpoints.schema")),
    SlackChannels : mongoose.model('SlackChannels', require("./slack.schema")),
    SlackMessages : mongoose.model('SlackMessages', require("./slack.messages.schema"))
};

