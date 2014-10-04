Posts = new Meteor.Collection("posts");

getAllPosts = function () {
  return Posts.find({
  }, {
    sort: {timestamp : -1},
    limit: 32});
};

Meteor.publish("allPosts", getAllPosts);

Meteor.methods({
  post: function (content, recipient) {

    var user = Meteor.users.find({_id: this.userId}).fetch()[0];

    var date = new Date();
    var start = new Date(date.setHours(-4, 0, 0, 0)); // EDT fix

    var count = Posts.find({
		receiver: Meteor.user().username,
  		sender: Meteor.user().username
	}).count();

    if (count === 0) {
      Posts.insert({
        owner: this.userId,
        sender: user.username,
        receiver: recipient,
        name: user.profile.name,
        content: content,
        timestamp: new Date()
      });
    }
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