const cluster = require("cluster");
const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const config = require('config');


const services = require("./services");

const redis_cache = require("./redis-cache").redis_cache;

const cors = require("cors");
const helmet = require("helmet");
const path = require('path');

const main = require('./tests/test');

const PORT = process.env.PORT || 3030;

const app = express(feathers());



app.configure(configuration());
// adding cors
app.use(helmet());
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.status(200).sendFile(path.join(__dirname,'public','index.html'));
});

app.configure(express.rest());
app.configure(socketio());

// set up services
app.configure(services);

// configure middlewares for 404

app.use(express.notFound());

// configure middleware for errorhandling
app.use(express.errorHandler());


app.service('comments').on('created', comment => {
  // todo hook a database right here to save created comments
  console.log('a comment was just created', comment);
});

app.service('comments').on('removed', comment => {
  // todo hook a database method to delete comment right here
  console.log('this comment was deleted', comment);
});


app.service('users').on('created', user => {
  // consider doing something else here related to the user being created
  console.log('user created : ', user);
});


app.service('users').on('removed' , user => {
  // TODO- do something else related to the user being removed
  console.log('user removed', user);
});

app.service('end-points').on('created', endpoint => {
  // TODO- do something here related to endpoint being removed for example
  // remove all related comments to the endpoint
  console.log('end-point removed', endpoint);
});



app.on('connection',connection => {
  app.channel('comments-server').join(connection);
});

app.publish(() => app.channel("comments-server"));


// this code enables my app to run as cluster, thereby able to scale horizontally
const CLUSTER_COUNT = 4;

if (cluster.isMaster) {
  for (let i = 0; i < CLUSTER_COUNT; i++) {
    cluster.fork();
  }
} else {

  // ensure the same worker handles websocket connections
  app.configure(
    socketio({
      transports: ["websocket"]
    })
  );
  
  app.listen(PORT).on('listening', () => {
    console.log('comments realtime live server listening on : ',PORT);
  });
}




/**
 * loading tests only if development is on
 */
const is_dev = process.env.IS_DEVELOPMENT ||  config.get("IS_DEVELOPMENT");
is_dev?
  main() : null
