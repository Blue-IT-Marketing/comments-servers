
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
  
  app.service("comments").create({
    id: uuidv4(),
    parent_id: "",    
    post_endpoint : '324234234523',   
    uid: '87485934hfdsf874',
    comment: "hello world",
    tags : ['cars','mercedes','electric cars'],
    timestamp: Date.now()
  });

  const tag = 'cars';
  app
    .service("comments")
    .returnByTag(tag)
    .then(response => {
      console.log("return by tag", response);
      response.forEach(comment => {
        console.log("tag : ", comment);
        console.log(`------------------------`);
      });
      console.log(`-------------------tests done-----------------`);
    });
  
};


module.exports = main;
