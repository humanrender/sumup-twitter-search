//= require retweet_view
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