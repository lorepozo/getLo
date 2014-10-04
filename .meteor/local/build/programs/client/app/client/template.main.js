(function(){
UI.body.contentParts.push(UI.Component.extend({render: (function() {
  var self = this;
  return [ HTML.Raw('<i class="large logo inverted square location nav icon link"></i>\n  <div class="ui page dimmer">\n    <div class="content">\n      <div class="center"></div>\n    </div>\n  </div>\n'), Spacebars.include(self.lookupTemplate("app")) ];
})}));
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });

Template.__define__("app", (function() {
  var self = this;
  var template = this;
  return UI.If(function() {
    return Spacebars.call(self.lookup("currentUser"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", Spacebars.include(self.lookupTemplate("feed")), "\n  " ];
  }), UI.block(function() {
    var self = this;
    return [ "\n    ", Spacebars.include(self.lookupTemplate("login")), "\n  " ];
  }));
}));

})();
