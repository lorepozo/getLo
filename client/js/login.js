Template.login.events({
  'click .login.button': function () {
    login();
    clearInputs();
  },
  'click .register.button': function(){
    register();
    clearInputs();
  },
  'keyup #password' : function (event) {
    if (event.keyCode === 13) {
      login();
      clearInputs();
    }
  },
  'keyup .form' : function () {
    hideErrorMessage();
  }
});

login = function () {
  Meteor.loginWithPassword(getUsername(), getPassword(),
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
	})
}

showErrorMessage = function () {
  $('.error.message').addClass('visible');
};

hideErrorMessage = function () {
  $('.error.message').removeClass('visible');
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

clearInputs = function () {
  $('input').val("");
};