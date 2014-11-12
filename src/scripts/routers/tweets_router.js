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