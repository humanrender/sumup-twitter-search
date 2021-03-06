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