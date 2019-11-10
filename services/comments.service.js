// todo add mongodb and add this functionality for mongodb 
const Comments = require('../schemas').Comments;

//   id: {type:String,required:true},
//   parent_id : {type:String,required:false},  
//   post_endpoint : {siteURL:{type:String,required:true},postURL:{type:String,required:true}},
//   author: {
//     uid:{type:String,required:true},
//     names:{type:String},
//     tags:Array,
//     job:String,
//     description: String,
//     avatar:String
//   },
//   comment: {type:String,required:true},
//   tags:{type:Array},
//   timestamp: {type:Date, 'default': Date.now}



class CommentsService {
    constructor(){
        this.comments = new Comments();
    }

    async find(id){
        // return this.comments.find(comment => comment.id === id);

        await Comments.find({ id : id}).exec().then(comment => {
            return comment;
        }).catch(error => {
            console.log(error);
            return error;
        });
    }

    async create(data){
        
        const comment = {
          id: data.id,
          parent_id:data.parent_id,
          originURL: data.originURL,
          post_endpoint: data.post_endpoint,
          author: data.author,
          comment: data.comment,
          timestamp: Date.now()
        };

        const newComment = new Comments(comment);

       await newComment.save().then(comment => {
            return comment;
        }).catch(error => {
            return error;
        });                
    }

    async update(data){
        
        const comment = {
          id: data.id,
          parent_id: data.parent_id,
          originURL: data.originURL,
          post_endpoint: data.post_endpoint,
          author: data.author,
          comment: data.comment,
          timestamp: Date.now()
        };

        await Comments.update({id : comment.id},comment, (err,results) => {
            if(err){
                return err;
            }

            return results;
        });
    }

    async remove(id){

        await Comments.deleteOne({id : id}).exec().then(results => {
            if(results.deletedCount > 0){
                return results.ok;
            }
            return null;

        }).catch(error => error);        
    }

}

module.exports = function(app){
    app.use('/comments', new CommentsService());
};