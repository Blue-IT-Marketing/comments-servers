// todo add mongodb and add this functionality for mongodb
const Comments = require("../schemas").Comments;
const Users = require("../schemas").Users;
const EndPoints = require("../schemas").EndPoints;
const uuidv4 = require("uuid/v4");

    // id : {type: String,required : true},
    // uid : {type : String,required : true},
    // siteURL:{type:String,required:true},
    // postURL:{type:String,required:true},
    // count : {type:Number,required:true}



class EndPointsService {
    
    constructor(){
        this.endpoints = new EndPoints();
    };


    async find (id){
        return await EndPoints.find({id : id}).exec().then(endpoints => endpoints).catch(error => null);
    }

    async create (data){
        const endpoint = {
            id : data.id || uuidv4(),
            uid : data.uid,
            siteURL : data.siteURL,
            postURL : data.postURL,
            count : data.count || 0
        };
        const new_endpoint = new EndPoints(endpoint);
        return await new_endpoint.save().then(result => result).catch(error => null);
    }
    // add other endpoints

}


module.exports = function(app) {
  app.use("/end-points", new EndPointsService());
};
