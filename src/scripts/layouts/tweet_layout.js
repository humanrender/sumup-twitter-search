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