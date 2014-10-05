var url = 'https://api.parse.com/1/push';
var appId = 'm31OmA2VnCG1cR6DEzeBJzNOHPIkH3j0eAVPFR7P';
var restKey = 'FxRbprMjTmLmoUchaLp3BxVxIDzZwCWFiEwhyoAT';
var targetDevice = 'c889d897-0570-4ba3-ac6a-c2c932ea2a8f';

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
    });
	
	var notifMsg = string.concat(user.username, " wants to GetLo");
	var pushPayload = {"where": {"objectId": targetDevice}, "data": {"alert": notifMsg}};
	pushPayload = JSON.stringify(pushPayload);
	
	$.ajax({
	url: url,
	type: "POST",
	contentType: "application/json",
	port: 443,
	data: pushPayload,
	headers: {"X-Parse-Application-Id": appId, "X-Parse-REST-API-Key": restKey}
	})
  },
  
  add: function (contact) {
  	
	var user = Meteor.users.find({_id: this.userId}).fetch()[0];
	
	if (!Meteor.users.find({username: contact}).fetch()[0]) {return}
	Contacts.insert({
		user: user.username,
		contact: contact
	})
  }
});
