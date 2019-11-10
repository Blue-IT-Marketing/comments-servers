const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");


const cors = require("cors");

const uuidv4 = require("uuid/v4");
const helmet = require("helmet");


const services = require('./services');

const redis_cache = require('./redis-cache').redis_cache;

const PORT = process.env.PORT || 3030;

const app = express(feathers());


app.configure(configuration());
// adding cors
app.use(helmet());
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// app.use('/', express.static(app.get('public')));

app.configure(express.rest());
app.configure(socketio());

// set up services
app.configure(services);


// configure middlewares for 404

app.use(express.notFound());


app.service('comments').on('created', (comment) => {
  // todo hook a database right here to save created comments
  console.log('a comment was just created', comment);
});

app.service('comments').on('removed', (comment) => {
  // todo hook a database method to delete comment right here
  console.log('this comment was deleted', comment);
});



app.use(express.errorHandler());

app.on('connection',connection => {
  app.channel('commenting').join(connection);
});

app.publish(() => app.channel('commenting'));

app.listen(PORT).on('listening', () => {
  console.log('comments realtime live server listening on',PORT);
});

//___________________this is the end coming next is temporary example -------//
