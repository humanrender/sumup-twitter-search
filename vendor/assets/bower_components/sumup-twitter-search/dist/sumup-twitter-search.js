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
var RetweetsCollection = Backbone.Collection.extend({
  model: Tweet,
  setTweetId: function(tweet_id){
    this.tweet_id = tweet_id;
  },
  url : function() {
    return "/tweets/retweets/"+this.tweet_id;
  }
});   
var TweetsCollection = Backbone.Collection.extend({
  model: Tweet,
  url : function() {
    return "/tweets/search.json";
  }
});   
var RetweetView = Marionette.ItemView.extend({
  tagName: "li",
  template: "#retweet-view-template",
  className: "retweets__list__item"
});

var RetweetsView = Marionette.CompositeView.extend({
  className: "retweets",
  childView: RetweetView,
  childViewContainer: ".retweets__list",
  template: "#retweets-view-template",
  collectionEvents: {
    "reset": "onCollectionReset"
  },
  onRender: function(){
    this.changeVisibility();
  },
  onCollectionReset: function(e){
    this.changeVisibility();
  },
  changeVisibility: function(){
    if(!this.collection.length){
      this.$el.hide();
    }else{
      this.$el.show();
    }
  }
});
var TweetView = Marionette.ItemView.extend({
  template: "#tweet-view-template",
  initialize: function(options){
    this.complete = options.complete;
  },
  templateHelpers:function(){
    var model = this.model;
    return {
      url: model.twitterUrl(),
      from_now: function(){
        return moment(model.get("created_at").replace(/( \+)/, ' UTC$1')).fromNow();
      },
      complete: this.complete,
      media: model.get("entities").media || []
    };
  }
});

var TweetListItemView = TweetView.extend({
  tagName: "li",
  events:{
    "click": "onClick"
  },
  onClick: function(e){
    if($(e.target).closest("a").length) return;
    TweetsRouter.navigateToTweet(this.model.get("id_str"));
  }
});

var TweetsListView = Marionette.CollectionView.extend({
  tagName: "ul",
  className: "twitter-search__list",
  childView: TweetListItemView
});
var FadeTransitionRegion = Backbone.Marionette.Region.extend({

  show: function(view){
    this._ensureElement();
    view.render();

    this.close(function() {
      if (this.currentView && this.currentView !== view) { return; }
      this.currentView = view;

      this.open(view, function(){
        if (view.onShow){view.onShow();}
        view.trigger("show");

        if (this.onShow) { this.onShow(view); }
        this.trigger("view:show", view);
      });
    });

  },

  close: function(cb){
    var view = this.currentView;
    delete this.currentView;

    if (!view){
      if (cb){ cb.call(this); }
      return; 
    }

    var that = this;
    this.$el.fadeOut(function(){
      if (view.close) { view.close(); }
      that.trigger("view:closed", view);
      if (cb){ cb.call(that); }
    });

  },

  open: function(view, callback){
    var that = this;
    this.$el.html(view.$el);
    this.$el.fadeIn(function(){
      callback.call(that);
    });
  }

});
var TweetLayout = Marionette.LayoutView.extend({
  template: "#tweet-layout-template",
  regions: {
    content: "#tweet",
    interactions: "#tweet-interactions"
  },
  events:{
    "click .twitter-search__back": "navigateToIndex"
  },
  navigateToIndex: function(e){
    e.preventDefault();
    TweetsRouter.navigateToIndex();
  }
});
var TweetsLayout = Marionette.LayoutView.extend({
  tagName: "article",
  template: "#tweets-layout-template",
  regions: {
    list: "#tweets-list"
  }
});
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
var TweetsRouter = (function(){
  var Router = Marionette.AppRouter.extend({
    controller: new TweetsController(),
    appRoutes: {
      "": "index",
      "tweet/:tweet_id": "show"
    },
    navigateToTweet: function(tweet_id){
      var route = "tweet/"+tweet_id;
      Backbone.history.navigate(route, {trigger: true});
    },
    navigateToIndex: function(tweet_id){
      Backbone.history.navigate("", {trigger: true});
    }
  });

  return new Router();
})();



var TwitterSearchApp = Marionette.Application.extend({
  regions:{
    mainRegion: {
      selector: "#app",
      regionClass: FadeTransitionRegion
    }
  }
});

var App = new TwitterSearchApp();
App.Tweets = new TweetsCollection();
App.on("start", function(){
  Backbone.history.start();
});
$(window).load(function(){
  App.start();
});








