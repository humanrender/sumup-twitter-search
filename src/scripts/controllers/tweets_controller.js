var TweetsController = Marionette.Controller.extend({
  index: function(){
    var layout = new TweetsLayout();

    App.mainRegion.show(layout);

    layout.list.show(new TweetsListView({
      collection: App.Tweets
    }));

    if(!App.Tweets.length){
      App.Tweets.fetch();
    }
  },

  show: function(tweet_id){
    var tweets = App.Tweets,
        tweet = tweets.findWhere({id_str: tweet_id});
    if(tweet){
      this.renderShow(tweet);
    }else{
      var self = this;
      tweet = new Tweet({ id_str: tweet_id });      
      tweet.fetch()
        .success(function(){
          self.renderShow(tweet);
        });
    }
  },
  renderShow: function(tweet){
    var layout = new TweetLayout();

    App.mainRegion.show(layout);

    layout.content.show(new TweetView({
      model: tweet,
      complete: true
    }));

    layout.interactions.show(new RetweetsView({
      collection: tweet.retweets()
    }));
    tweet.retweets().fetch({reset: true});
  }
});