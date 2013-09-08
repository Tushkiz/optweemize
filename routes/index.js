
/*
 * Routes
 */


var twitterUtil = require('../twitter-util');

exports.index = function(req, res){
  res.render('index', { title: 'Optweemize' });
};

exports.stats = function(req, res) {
  var handler = req.body.handler;

  twitterUtil.calc(handler, function(data) {
    console.log('calculating....');
  });

  /*twitterUtil.getFollowers(handler, function(data) {
    var followerIds = JSON.parse(data).ids;
    followerIds.map(function(follower) {
      var tweetsPerFollower = 50;

      twitterUtil.getTweets(follower, tweetsPerFollower, function(tweets) {
        JSON.parse(tweets).map(function(tweet) {
          bucket_number = twitterUtil.extractTimeData(tweet.created_at)
          chartData[bucket_number]++;
        });
      });
    });
  });*/
};







/*function render (res, data) {
  res.render('stats', { data: JSON.parse(data), followers: });
}*/

// exports.getStats = function(req, res) {
//   var twitterHandle = req.param.twitterHandle;
//   var followers=getFollowerIds(twitterHandle);
//   var timesOfTweets=getTweetsOfFollowers(followers);
//   var chartData=extractTimeData(timesOfTweets);
//   res.end(userDetails,chartData);
// };
