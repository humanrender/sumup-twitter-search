var TweetsLayout = Marionette.LayoutView.extend({
  tagName: "article",
  template: "#tweets-layout-template",
  regions: {
    list: "#tweets-list"
  }
});