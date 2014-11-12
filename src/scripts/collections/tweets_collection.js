var TweetsCollection = Backbone.Collection.extend({
  model: Tweet,
  url : function() {
    return "/tweets/search.json";
  }
});   