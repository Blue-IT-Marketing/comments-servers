

const users = require('./users');
const comments = require('./comments');
const auth = require('./authentication');
const channels = require('./channels');
const logger = require('./logger');

module.exports = function(app){
    app.configure(users);
    app.configure(comments);        
    app.configure(logger);    
};