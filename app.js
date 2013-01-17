/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Room = require('./nes-chat/Room.js')
  , io = require('socket.io')
  , toobusy = require('toobusy');

//Get PORT from enbironment or set to 5000 as default
var port = process.env.PORT || 5000;

var app = express()
  , server = app.listen(port, function(){
    console.log("Server listening on PORT " + port);
  })
  , io = io.listen(server);


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  //Toobusy middleware
  app.use(function(req, res, next) {
  // check if we're toobusy() - note, this call is extremely fast, and returns
  // state that is cached at a fixed interval
  if (toobusy()) res.send(503, "I'm busy right now, sorry.");
  else next();
});
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function() {
  app.use(express.errorHandler());
});



//Socket.io configuration

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
  io.set("close timeout", 10);
  io.set("log level", 1);
});

  Room.init();

  io.sockets.on('connection', function (socket) {

  socket.emit('status', { connected: 'true'});

  io.sockets.emit('count', Room.countUsers());

  socket.on('setClient',function(data)
  {
    Room.addClientId(socket.id, data['user']);
    //Room.addClientIP(socket.handshake.address, data['user']);
    var endpoint = socket.manager.handshaken[socket.id].address;
    Room.addClientIP(endpoint, data['user']);
    console.log(Room.listUsers());
  });

  socket.on('message', function (data) {
    socket.broadcast.emit('recieve', data);
    console.log(data);
  });

  socket.on('disconnect', function () {
    if(Room.removeClient(socket.id))
      console.log(socket.id + ' has disconnected');
    io.sockets.emit('count', Room.countUsers());
  });

});


//Routes
app.get('/', routes.index);
app.post('/chat', function(req, res, next){
  if(!Room.addUser(req.body.username))
    routes.validate(req, res);
  else{
    routes.chat(req, res);
}
});
app.get('/users',function(req, res, next)
  {
    routes.users(req, res, Room.listUsers());
  });