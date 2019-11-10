

const Users = require('../schemas').Users;

// todo add mongodb and add this functionality for users services
//   uid: {type:String,required:true},
//   names : {type:String,required:true},
//   tags:Array,
//   job:String,
//   description: String,
//   avatar:String,
//   lastlogin: {type:Date, 'default': Date.now}  

class UsersService{
    constructor(){
        this.users = new Users();
    }

    async find(uid){        
        
        await Users.find({uid : uid}).exec().then(user => {
            return user
        }).catch(error => error);
    }

    async create(data){
        const user = {
          uid: data.uid,
          names: data.names,
          tags: data.tags,
          job: data.job,
          description: data.description,
          avatar : data.avatar,
          lastlogin : data.lastlogin
        };

        const newUser = new Users(user);
        await newUser.save().then(user => {
            return user;
        }).catch(error => error);

    }

    async update(data){
        const user = {
          uid: data.uid,
          names: data.names,
          tags: data.tags,
          job: data.job,
          description: data.description,
          avatar: data.avatar,
          lastlogin: data.lastlogin
        };

        Users.update({uid : uid}, user,(error, user) => {
            if(error){return error}
        });

    }

    async remove(uid){

        Users.deleteOne({uid:uid}).exec().then(results => {
            if(results.deletedCount > 0){
                return results.ok;
            }
            return null;

        }).catch(error => error);        
    }
}

module.exports = function(app){
    app.use('/users', new UsersService());
};