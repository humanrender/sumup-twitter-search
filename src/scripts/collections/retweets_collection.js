var RetweetsCollection = Backbone.Collection.extend({
  model: Tweet,
  setTweetId: function(tweet_id){
    this.tweet_id = tweet_id;
  },
  url : function() {
    return "/tweets/retweets/"+this.tweet_id;
  }
});   