//= require tweet_view
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