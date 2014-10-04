// Today!
var today = new Date();
var start = new Date(today.setHours(0, 0, 0, 0));

Session.set("yourPost", "");

Template.feed.events({
    'click .logout': function () {
		Meteor.logout()
    }
});

Template.feed.posts = function () {
  return Posts.find({$or:
	  [{receiver: Meteor.user().username},
	  {sender: Meteor.user().username}]
  }, {
    sort: {timestamp: -1},
    limit: 35
  })
};

Template.feed.feed = function () {

  var count = Posts.find({
    receiver: Meteor.user().username,
	sender: Meteor.user().username
  }).count();

  if (count === 0) {
    return "You have nothing in your feed!"
  }
};

Template.post.rendered = function () {
  $(this.find('.post'))
    .transition('fade up in');
};

Template.feed.events({
  'click .submit.button': function () {
    Meteor.call('post', getPostInput(), getRecipient());
    clearInputs();
  },
  'keyup #post' : function (event) {
    if (event.keyCode === 13) {
      Meteor.call('post', getPostInput(), getRecipient());
      clearInputs();
    }
  }
});

getPostInput = function () {
  return $('#post').val();
};

getRecipient = function () {
  return $('#recipient').val();
};

clearInputs = function () {
  $('#post').val("");
};