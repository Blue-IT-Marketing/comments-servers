const SlackMessages = require("../schemas").SlackMessages;
const uuidv4 = require("uuid/v4");
class SlackMessagesService {
    constructor(){
        this.messages = new SlackMessages()
    }

    async find(message_id){

        return await SlackMessages.find({ message_id: message_id }).exec().then(messages => messages).catch(error => null)
    }

    // channel_id : {type: String,required:true},
    // thread_id : String,
    // message_id : {type:String,required:true},
    // message : {type:String,required:true},
    // timestamp : {type : Date,required:true}

    async create(data){
      const message = {
          channel_id : data.channel_id,
          thread_id : data.thread_id,
          message_id : uuidv4(),
          message : data.message,
          timestamp : Date.now()
      }

      const newMessage = new SlackMessages(message);
      return await newMessage.save().then(message => message).catch(error => null)
    }
}








module.exports = function(app) {
  app.use("/slack-messages", new SlackMessagesService());
};