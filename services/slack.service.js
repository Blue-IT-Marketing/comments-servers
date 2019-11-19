
const SlackChannels = require("../schemas").SlackChannels;

const config = require('config');
const { RTMClient } = require("@slack/rtm-api");


class SlackChannelsService {
    constructor(){

        this.token = process.env.SLACK_BOT_TOKEN || config.get("SLACK_BOT_TOKEN");
        this.rtm = new RTMClient(token);
    }

    async find(channel_id){
        return await SlackChannels.find({channel_id : channel_id}).exec().then(channel => channel).catch(error => null)
    }

    async create(data){
        const channel = {
            channel_id : data.channel_id,
            channel_name : data.channel_name,
            private : data.private
        }

        exists = await this.find(data.channel_id);

        if (exists !== null){
            const newChannel = SlackChannels(channel);
            return await newChannel.save().then(channel => channel).catch(error => null)
        }
        return null
    }

    async remove(channel_id){

        return await SlackChannels.deleteOne({channel_id : channel_id}).exec().then(results => {
            if (results.deletedCount > 0){return results.ok}
            return null
        }).catch(error => null)
    }

    async sendToChannel(channel_id,data){
        
    }

}


module.exports = function(app) {
  app.use("/slack-channels", new SlackChannelsService());
};