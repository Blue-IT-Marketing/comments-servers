
class UsersService{
    constructor(){
        this.users = [];
        return this.users;
    }

    async find(){
        return this.users;
    }

    async create(data){
        const user = {
            uid : data.uid,
            names : data.names
        };
        
        if (this.users.find(user => user.uid === data.uid)) {
          return null;
        }

        this.users.push(user);
        return user;
    }
}

module.exports = function(app){
    app.use('/users', new UsersService());
};