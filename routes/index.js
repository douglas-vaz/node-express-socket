
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node-Express-Socket.io' });
};

exports.validate = function(req, res){
  res.render('index', { title: 'Node-Express-Socket.io', invalid: 'true'});
};

/*
 * POST chat page.
 */

exports.chat = function(req, res){
  res.render('chat', { username: req.body.username, title: 'Chat - '+req.body.username });
};

exports.users = function(req, res, users){
	res.render('users', {'users': users});
};