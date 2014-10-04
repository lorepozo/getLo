Posts = new Meteor.Collection("posts");

getAllPosts = function () {
  return Posts.find({
  }, {
    sort: {timestamp : -1},
    limit: 32});
};

getTodaysPosts = function (date) {

  var start = new Date(date.setHours(0, 0, 0, 0));

  console.log(start);

  return Posts.find({
    timestamp: { $gte: start }
  });
};

Meteor.publish("allPosts", getAllPosts);

Meteor.publish("todaysPosts", getTodaysPosts);

Meteor.methods({
  post: function (content) {

    var user = Meteor.users.find({_id: this.userId}).fetch()[0];

    var date = new Date();
    var start = new Date(date.setHours(-4, 0, 0, 0)); // EDT fix

    var count = Posts.find({
      owner: user._id,
      timestamp: { $gte: start }
    }).count();

    console.log(start);
    console.log(count);

    if (count === 0) {
      Posts.insert({
        owner: this.userId,
        username: user.username,
        name: user.profile.name,
        content: content,
        timestamp: new Date()
      });
    }
  },
  resetPasswordEmail: function () {
    Accounts.sendResetPasswordEmail(this.userId);
  }
});

// Allow permissions for the server.
Posts.allow({
  insert: function (userId, doc) {
    // Don't fuck with the console, yo
    return false;
  },
  update: function (userId, doc) {
    return userId === doc.owner;
  },
  remove: function (userId, doc) {
    return userId === doc.owner;
  }
});