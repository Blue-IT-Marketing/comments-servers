// todo add mongodb and add this functionality for mongodb 
const Comments = require('../schemas').Comments;
const Users = require('../schemas').Users;
class CommentsService {
    constructor(){
        this.comments = new Comments();
    }


    async find(id){
        // return this.comments.find(comment => comment.id === id);

       return await Comments.find({ id : id}).exec().then(comment => {
            return comment;
        }).catch(error => {
            console.log(error);
            return error;
        });
    }

    async create(data){
        
        const comment = {
          id: data.id,
          parent_id: data.parent_id,
          post_endpoint: data.post_endpoint,
          author: data.author,
          comment: data.comment,
          tags: data.tags,
          timestamp: Date.now()
        };

        const newComment = new Comments(comment);

       return await newComment.save().then(results => {
            return comment;
        }).catch(error => {
            return error;
        });                
    }

    async update(data){
        
        const comment = {
          id: data.id,
          parent_id: data.parent_id,
          post_endpoint: data.post_endpoint,
          author: data.author,
          comment: data.comment,
          tags: data.tags,
          timestamp: Date.now()
        };

       return await Comments.update({id : comment.id},comment, (err,results) => {
            if(err){
                return err;
            }

            return results;
        });
    }

    async remove(id){

       return await Comments.deleteOne({id : id}).exec().then(results => {
            if(results.deletedCount > 0){
                return results.ok;
            }
            return null;

        }).catch(error => error);        
    }

    async commentsByUser(uid){
        const author = await Users.find({uid : uid}).exec().then(user => {
            return user
        }).catch(error => null);

        if (author){
            return Comments.find({author : author}).exec().then(comment => comment).catch(error => error)
        }else{return null}
    }

    // given a parent id return all threaded comments
    async threads(id){
        return await Comments.find({parent_id : id }).exec().then(comments => {
            return comments
        }).catch(error =>  null);
    }

    // return a list of comments by post endpoint
    async returnByEndPoint(post_endpoint){
        return await Comments.find({post_endpoint : post_endpoint}).exec().then(comments => {
            return comments;
        }).catch(error =>  null);
    }

    async returnbyTag(tag){
        return await Comments.find({tags : { $in: [tag] }}).exec().then(comments => comments).catch(error => null);
    }

}

module.exports = function(app){
    app.use('/comments', new CommentsService());
};

