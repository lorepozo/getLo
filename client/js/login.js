Template.login.events({
  'click .login.button': function () {
    login();
    clearInput();
  },
  'click .register.button': function(){
    register();
    clearInput();
  },
  'keyup #password' : function (event) {
    if (event.keyCode === 13) {
      login();
      clearInput();
    }
  },
  'keyup .form' : function () {
    hideErrorMessage();
  }
});

login = function (username, password) {
  Meteor.loginWithPassword(getUsername() || username, getPassword() || password,
    function (error) {
      if (error) {
        showErrorMessage();
      }
    });
};

register = function () {
	Accounts.createUser({
		username: getUsername(),
		email: getEmail(),
		password: getPassword(),
		profile: {
			name: getName()
		}
	},
	function (error) {
		if (error) {
			showRegErrorMessage()
		}
	})
}

showErrorMessage = function () {
  $('.error.message').addClass('visible');
};

hideErrorMessage = function () {
  $('.error.message').removeClass('visible');
  $('.regerror.message').removeClass('visible');
};

showRegMessage = function () {
  $('.regerror.message').addClass('visible');
};

getUsername = function () {
  return $('#username').val();
};

getPassword = function () {
  return $('#password').val();
};

getEmail = function () {
  return $('#email').val();
}

getName = function () {
	return $('#name').val();
}

clearInput = function () {
  $('#recipient').val("");
};