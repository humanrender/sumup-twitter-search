var Tweet = Backbone.Model.extend({
  url : function() {
    return "/tweets/"+this.get("id_str");
  },
  twitterUrl: function(){
    return "http://twitter.com/"+
              this.get("screen_name")+
              "/status/"+
              this.get("id_str");
  },
  retweets: function(){
    if(!this.retweetsCollection){
      this.retweetsCollection = new RetweetsCollection();
      this.retweetsCollection.setTweetId(this.get("id_str"));
    }
    return this.retweetsCollection;
  }
});