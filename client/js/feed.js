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
  return Posts.find({
    timestamp: { $gte: start }
  }, {
    sort: {timestamp: -1},
    limit: 35
  });
};

Template.feed.feed = function () {

  var count = Posts.find({
    timestamp: { $gte: start }
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
    Meteor.call('post', getPostInput());
    clearPostInput();
  },
  'keyup #post' : function (event) {
    if (event.keyCode === 13) {
      Meteor.call('post', getPostInput());
      clearPostInput();
    }
  }
});

Template.feed.hasPostedToday = function () {
  var count = Posts.find({
    owner: Meteor.user()._id,
    timestamp: { $gte: start }
  }).count();

  return count > 0;
};

Template.goodjob.rendered = function () {

  $(this.find('goodjob'))
    .transition('fade up in');


  var yourPost = Posts.find({
    owner: Meteor.user()._id,
    timestamp: { $gte: start }
  },{
    sort: {timestamp: -1}
  }).fetch()[0];

  Session.set("yourPost", yourPost);

  $('#update').val(yourPost.content);

};

Template.goodjob.events({
  'click .update.button' : function () {
    updateYourPost();
  },
  'keyup #yourPost' : function (e) {
    if (e.keyCode === 13) {
      updateYourPost();
    }
  }
});

updateYourPost = function () {
  var yourPost = Posts.find({
    owner: Meteor.user()._id,
    timestamp: { $gte: start }
  },{
    sort: {timestamp: -1}
  }).fetch()[0];

  Posts.update({
    _id: yourPost._id
  }, {
    $set: {
      content: $('#update').val(),
      timestamp: new Date()
    }
  });
};

getPostInput = function () {
  return $('#post').val();
};

clearPostInput = function () {
  $('#post').val("");
};