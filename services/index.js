

// const auth = require('./authentication');
// const channels = require('./channels');
const users = require('./users.service');
const comments = require('./comments.service');
const endpoints = require('./endpoints.service');



module.exports = function(app){
    app.configure(users);
    app.configure(comments);           
    app.configure(endpoints);
};