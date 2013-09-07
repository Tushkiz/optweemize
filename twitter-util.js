var OAuth = require('oauth').OAuth;

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


exports.getFollowers = function (handler, callback) {
  oa.get("https://api.twitter.com/1.1/followers/ids.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
    var result;
    if (error) {
      result = { error: error };
    } else {
      result = data;
    }

    callback(result);

  });
}

exports.getTweets = function (id_str, count, callback) {
  oa.get("https://api.twitter.com/1.1/statuses/user_timeline.json?id_str=" + id_str + "&count=" + count, access_token, access_token_secret, function (error, data) {
    var result;
    if (error) {
      result = { error: error };
    } else {
      result = data;
    }

    callback(result);

  });
}

exports.extractTimeData = function (dateString) {
  return new Date(dateString).getUTCHours();
}

// ---------------------------- //

exports.getLatestProfilePicture = function (handler, callback) {
  oa.get("http://api.twitter.com/1.1/users/show.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
    var result;
    if (error) {
      result = {error: error};
    } else {
      result = JSON.parse(data);
    }

    callback(result);

  });
}

exports.getUserDetails = function (handler, callback) {
  oa.get("https://api.twitter.com/1.1/users/lookup.json?screen_name=" + handler, access_token, access_token_secret, function (error, data) {
    var result;
    if (error) {
      result = { error: error };
    } else {
      result = data;
    }

    callback(result);

  });
}
