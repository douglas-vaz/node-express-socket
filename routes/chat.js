
/*
 * POST chat page.
 */

exports.chat = function(req, res){
  res.render('chat', { username: req.body.username });
};