(function(){
Template.__define__("login", (function() {
  var self = this;
  var template = this;
  return HTML.Raw('<div class="ui login form">\n    <div class="login logo">\n      <i class="location icon"></i>\n    </div>\n    <div class="field">\n      <label>Username</label>\n      <div class="ui left labeled icon input">\n        <input id="username" type="text" placeholder="Username">\n        <i class="location icon"></i>\n      </div>\n    </div>\n    <div class="field">\n      <label>Password</label>\n      <div class="ui left labeled icon input">\n        <input id="password" type="password" placeholder="Password">\n        <i class="lock icon"></i>\n      </div>\n    </div>\n    <div class="ui blue fluid purple login button">Login</div>\n    <div class="ui error message">\n      The Username or Password is incorrect.\n    </div>\n	<hr>\n    <div class="field">\n      <label>Name</label>\n      <div class="ui left labeled icon input">\n        <input id="name" type="name" placeholder="Name">\n        <i class="user icon"></i>\n      </div>\n    </div>\n    <div class="field">\n      <label>Email</label>\n      <div class="ui left labeled icon input">\n        <input id="email" type="email" placeholder="Email">\n        <i class="mail icon"></i>\n      </div>\n    </div>\n	<div class="ui blue fluid purple register button">Register</div>\n  </div>');
}));

})();
