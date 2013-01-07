
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


/*
 * POST chat page.
 */

exports.chat = function(req, res){
  res.render('chat', { username: req.body.username, title: 'Chat - '+req.body.username });
};