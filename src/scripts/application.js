//= require_self
//= require initializers/bootstrap_models
//= require_tree initializers
var TwitterSearchApp = Marionette.Application.extend({
  regions:{
    mainRegion: {
      selector: "#app",
      regionClass: FadeTransitionRegion
    }
  }
});

var App = new TwitterSearchApp();