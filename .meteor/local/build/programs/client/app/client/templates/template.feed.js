(function(){
Template.__define__("feed", (function() {
  var self = this;
  var template = this;
  return [ UI.If(function() {
    return Spacebars.call(self.lookup("hasPostedToday"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", Spacebars.include(self.lookupTemplate("goodjob")), "\n  " ];
  }), UI.block(function() {
    var self = this;
    return [ "\n  ", HTML.DIV({
      "class": "prompt"
    }, "\n    ", HTML.DIV({
      "class": "question"
    }, " What did you achieve today? "), "\n    ", HTML.DIV({
      id: "today",
      "class": "content"
    }, "\n      ", HTML.DIV({
      "class": "ui inline fluid input"
    }, "\n        ", HTML.INPUT({
      id: "post",
      type: "text",
      placeholder: "Today, I ..."
    }), "\n      "), "\n      ", HTML.DIV({
      "class": "ui purple fluid submit button"
    }, "\n        Submit\n      "), "\n    "), "\n  "), "\n  " ];
  })), HTML.Raw('\n\n  <div class="ui divider"></div>\n  '), HTML.DIV({
    "class": "feed"
  }, "\n    ", function() {
    return Spacebars.mustache(self.lookup("feed"));
  }, "\n  "), "\n  ", UI.Each(function() {
    return Spacebars.call(self.lookup("posts"));
  }, UI.block(function() {
    var self = this;
    return [ "\n    ", Spacebars.include(self.lookupTemplate("post")), "\n  " ];
  })) ];
}));

Template.__define__("post", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "post container"
  }, "\n    ", HTML.IMG({
    "class": "ui circular image",
    src: [ "/assets/bros/", function() {
      return Spacebars.mustache(self.lookup("username"));
    }, ".jpg" ]
  }), "\n    ", HTML.DIV({
    "class": "content"
  }, '\n      "', function() {
    return Spacebars.mustache(self.lookup("content"));
  }, HTML.Raw('"\n      <br>\n    ')), "\n    ", HTML.DIV({
    "class": "user"
  }, "\n      ", function() {
    return Spacebars.mustache(self.lookup("name"));
  }, "\n    "), "\n  ");
}));

Template.__define__("goodjob", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div class="goodjob prompt">\n    <div class="question">\n      Thanks for checking in today!\n    </div>\n    <div class="centered content">\n      If you like, you can edit your post.\n    </div>\n    <div id="yourPost" class="content">\n      <div class="ui inline fluid input">\n        <input id="update" type="text" value="">\n      </div>\n      <div class="ui purple fluid update button">\n        Update\n      </div>\n    </div>\n  </div>');
}));

})();
