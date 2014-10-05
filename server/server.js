Los = new Meteor.Collection("los");

getAllLos = function () {
  return Los.find({
  }, {
    sort: {timestamp : -1},
    limit: 32});
};

Meteor.publish("allLos", getAllLos);

Meteor.methods({
  post: function (o) {

    var user = Meteor.users.find({_id: this.userId}).fetch()[0],
		count = Los.find({
			receiver: Meteor.user().username,
  			sender: Meteor.user().username
		}).count();
    Los.insert({
      owner: this.userId,
      sender: user.username,
      recipient: o.recipient,
      name: user.profile.name,
      content: o.content,
	  lat: o.lat,
	  long: o.long,
      timestamp: new Date()
    });
  }
});

// Allow permissions for the server.
Los.allow({
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