
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var port = 3000;

var app = express()
  , server = http.createServer(app)
  , io = io.listen(server);

  server.listen(port);

  io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('baka', function (data) {
    console.log(data);
  });
});

app.configure(function(){
  //app.set('port', process.env.PORT || 3000);
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


app.get('/', routes.index);
app.get('/users', user.list);
app.post('/chat', routes.chat);
//app.get('/socket.io/socket.io.js', )

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + port); //+ app.get('port'));
});
