Los = new Meteor.Collection("los");
Contacts = new Meteor.Collection("contacts");

myLos = function (user) {
  return Los.find({$or: [
	  {recipient: user.username},
	  {sender: user.username}
	]}, {
	  sort: {timestamp: -1},
	  limit: 32
	});
};

myContacts = function (user) {
	return Contacts.find({
		user: user.username
	})
};

Meteor.publish("myLos", myLos);
Meteor.publish("myContacts", myContacts);

Meteor.methods({
  post: function (o) {

    var user = Meteor.users.find({_id: this.userId}).fetch()[0];

    Los.insert({
      sender: user.username,
      recipient: o.recipient,
	  lat: o.lat,
	  long: o.long,
      timestamp: new Date()
    })
  },
  add: function (contact) {
  	
	var user = Meteor.users.find({_id: this.userId}).fetch()[0];
	
	if (!Meteor.users.find({username: contact}).fetch()[0]) {return}
	Contacts.insert({
		user: user.username,
		contact: contact
	});
	Contacts.insert({
		contact: contact,
		user: user.username
	})
  }
});