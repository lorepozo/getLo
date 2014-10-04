
Template.nav.events({
  'click .nav.icon': function () {
    toggleSidebar();
  },
  'click .signout': function () {
    toggleSidebar();
    Meteor.logout();
  },
  'click .resetPassword': function () {
    Meteor.call('resetPasswordEmail');
    showDimmerMessage("You've been sent an email to reset your password!");
    toggleSidebar();
  }
});

Template.nav.username = function () {
  return Meteor.user().username;
};

Template.nav.name = function () {
  return Meteor.user().profile.name;
};

Template.nav.isAdmin = function () {
  return Meteor.user().profile.admin;
}

toggleSidebar = function () {
  $('.nav.sidebar')
    .sidebar('toggle');
};

showDimmerMessage = function (msg) {
  $('.dimmer .center').text(msg);
  $('.dimmer').dimmer('show');
};