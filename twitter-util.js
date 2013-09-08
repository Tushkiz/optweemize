var OAuth = require('oauth').OAuth;

var Q = require('q');

var oa = new OAuth(
        "https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        "OWwAfwSvAJs0VgAnnBtZOQ", // consumer_secret
        "Eo7EFLiSAPs89Bvs3WzjgOf7UBAjaFbTveuS8K5QE", // consumer_secret_key
        "1.0A",
        null,
        "HMAC-SHA1");

var access_token = "31457410-eLJ4mn8wZbYf24DjgyLxD5dB4IdYJPmBvnno4O9A";
var access_token_secret = "wJt1RhDP9yWIHY2jynA7OD28dFT8Ne0SPRJ5N3pZzM";


var bucket_number;
var chartData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var getFollowers = exports.getFollowers = function (handler) {
  var defered = Q.defer();
  oa.get("https://api.twitter.com/1.1/followers/ids.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
    var result;
    if (error) {
      result = { error: error };
      defered.reject();
    } else {
      result = data;
      defered.resolve(JSON.parse(result).ids);
    }
  });
  return defered.promise;
}

var getTweets = exports.getTweets = function (id_str, count) {
  var defered = Q.defer();
  oa.get("https://api.twitter.com/1.1/statuses/user_timeline.json?id_str=" + id_str + "&count=" + count, access_token, access_token_secret, function (error, data) {
    var tweets;
    if (error) {
      tweets = { error: error };
      console.error(result.error);
      defered.reject();
    } else {
      tweets = data;
      JSON.parse(tweets).map(function (tweet) {
        bucket_number = extractTimeData(tweet.created_at);
        chartData[bucket_number]++;
      });
      console.log(id_str);
      defered.resolve('done');
    }

  });
  return defered.promise;
}

var extractTimeData = exports.extractTimeData = function (dateString) {
  return new Date(dateString).getUTCHours();
}


exports.calc = function (handler, callback) {
  getFollowers(handler)
  .then(function (followerIds) {
    var local =[];
    for (var i = 0; i < followerIds.length; i++) {
      local.push(getTweets(followerIds[i], 50));
    };
    Q.all(local).spread(function(){
      var max = 0;
      for (var i = 0; i < chartData.length; i++) {
        if(max < chartData[i]) max = chartData[i];
      };
      callback(chartData, max);
      console.log(chartData, max);
    });
  });
}

// ---------------------------- //

// exports.getLatestProfilePicture = function (handler, callback) {
//   oa.get("http://api.twitter.com/1.1/users/show.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
//     var result;
//     if (error) {
//       result = {error: error};
//     } else {
//       result = JSON.parse(data);
//     }

//     callback(result);

//   });
// }

// exports.getUserDetails = function (handler, callback) {
//   oa.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
//     var result;
//     if (error) {
//       result = { error: error };
//     } else {
//       result = data;
//     }

//     callback(result);

//   });
// }
