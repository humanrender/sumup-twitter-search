//= require tweet_list_item_view
var TweetsListView = Marionette.CollectionView.extend({
  tagName: "ul",
  className: "twitter-search__list",
  childView: TweetListItemView
});