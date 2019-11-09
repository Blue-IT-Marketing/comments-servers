


class CommentsService {
  constructor() {
    this.comments = [];
  }

  async find() {
    // find comments from mongodb

    return this.comments;
  }

  async get(id,params){

  };

  async create(data) {
    const comment = {
      id: uuidv4(),
      parent_id: data.parent_id,
      originURL: data.originURL,
      post_endpoint: data.post_endpoint,
      author: data.author,
      comment: data.comment,
      timestamp: Date.now()
    };

    this.comments.push(comment);

    return comment;
  }

  // delete comment by ID
  async remove(id) {
    this.comments = this.comments.filter(comment => comment.id !== id);
    // remove this comment from the database here as well
    return this.comments;
  }

  // empty comments by id
  async update(id,data,params) {
    this.comments = [];
    // clear comments from database as well
    return this.comments;
  }

}


module.exports = function(app) {
  app.use("/comments", new CommentsService());
};