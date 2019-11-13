
/**
 * 
 * module used to test my deployment of comments server
 * 
 */

const express = require("@feathersjs/express");
const configuration = require("@feathersjs/configuration");
const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio");
const app = express(feathers());

const services = require("../services");
app.configure(configuration());
const uuidv4 = require("uuid/v4");
app.configure(express.rest());
app.configure(socketio());

// set up services
app.configure(services);
// __________________________________this is the end coming next is temporary example -------

const main = () => {
  const id = uuidv4();
  app.service("comments").create({
    id: id,
    parent_id: "",    
    post_endpoint : {
      siteURL:'http://localhost',
      postURL:'original-post.html'
    },

    author: {
      uid: '87485934hfdsf874',
      names: 'justice ndou',
      tags: 'mercedes benz',
      job: 'designer',
      description: 'designer of mercesdes cars',
      avatar: '',
      lastlogin: '2019-11-12'
    },

    comment: "hello world",
    tags : ['cars','mercedes','electric cars'],
    timestamp: Date.now()
  });

  const tag = 'cars';
  app.service("comments").returnbyTag(tag).then(response => {
    console.log("return by tag", response);
    response.forEach(comment =>{ console.log('tag : ', comment); console.log(`------------------------`)});
    console.log(`-------------------tests done-----------------`);

  });
  
};


module.exports = main;
