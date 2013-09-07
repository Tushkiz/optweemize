
/*
 * Routes
 */


var twitterUtil = require('../twitter-util');

exports.index = function(req, res){
  res.render('index', { title: 'Optweemize' });
};

exports.stats = function(req, res) {
  var handler = req.body.handler;

  twitterUtil.getUserStats(handler, function(data) {
    //console.log(data);
    res.render('stats', { data: data });
  });
};
