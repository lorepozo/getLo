Template.login.events({
  'click .login.btn': function () {
    login();
  },
  'click .register.btn': function(){
    register();
  },
  'keyup #password' : function (event) {
    if (event.keyCode === 13) {
      login();
    }
  },
  'keyup .form' : function () {
    hideErrorMessage();
  },
  'click .reg.btn' : function(){
	$('#register').modal()
  }
});

login = function (username, password) {
  Meteor.loginWithPassword($('#username').val() || username, $('#password').val() || password,
    function (error) {
      if (error) {
        showErrorMessage();
      }
    });
};

$('.reg').on('click',function(){
	$('#register').modal({})
});

register = function () {
	Accounts.createUser({
		username: $('#reguser').val(),
		email: $('#regemail').val(),
		password: $('#regpassword').val(),
		profile: {
			name: $('#regname').val()
		}
	},
	function (error) {
		if (error) {
			showRegErrorMessage()
		}
		else {
			$('#register').modal("hide")
		}
	})
}

showErrorMessage = function () {
  $('.error').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Your username and password are invalid</div>');
};

hideErrorMessage = function () {
  $('.error').html('');
  $('.regerror').html('');
};

showRegMessage = function () {
  $('.regerror').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>Your username and password are invalid</div>');
};