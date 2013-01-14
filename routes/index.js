
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Node-Express-Socket.io' });
};


/*
 * POST chat page.
 */

exports.chat = function(req, res){
  res.render('chat', { username: req.body.username, title: 'Chat - '+req.body.username });
};