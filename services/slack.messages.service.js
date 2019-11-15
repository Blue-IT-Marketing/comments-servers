const SlackMessages = require("../schemas").SlackMessages;

class SlackMessagesService {
    constructor(){

    }

    async find(message_id){

      return true
    }

    async create(data){
      return true
    }
}








module.exports = function(app) {
  app.use("/slack-messages", new SlackMessagesService());
};