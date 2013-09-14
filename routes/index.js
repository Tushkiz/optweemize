
/*
 * Routes
 */


var twitterUtil = require('../twitter-util');

exports.index = function(req, res){
  res.render('index', { title: 'Optweemize - Tweet Optimization Analysis', author: 'Tushar Sonawane' });
};

exports.stats = function(req, res) {
  var handler = req.body.handler;

  twitterUtil.calc(handler, function(data, max) {
    res.render('stats', { handler: handler, data: data, max: max });
  });

  /*var data = [0, 0, 0, 0, 0, 264, 440, 880, 88, 176, 440, 352, 616, 88, 0, 0, 264, 352, 440, 0, 0, 0, 0, 0],
      max = 1000;
  res.render('stats', { handler: handler, data: data, max: max });*/
};
