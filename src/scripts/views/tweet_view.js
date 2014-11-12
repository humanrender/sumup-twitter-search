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