
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var port = process.env.PORT || 5000;

var app = express()
  , server = app.listen(port, function(){
    console.log("Server listening on PORT " + port);
  })
  , io = io.listen(server);

  // Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

  //server.listen(port);

  var user_count = 0;

  io.sockets.on('connection', function (socket) {

  socket.emit('status', { connected: 'true', count: user_count});
  socket.broadcast.emit('count', user_count);
  user_count += 1;

  socket.on('message', function (data) {
    socket.broadcast.emit('recieve', data);
    console.log(data);
  });


  socket.on('disconnect', function () {
    user_count -= 1;
  });

});


app.configure(function(){
  //app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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


//Routes

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/chat', routes.chat);