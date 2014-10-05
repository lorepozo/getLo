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

    

    Los.insert({
      sender: user.username,
      recipient: o.recipient,
	  lat: o.lat,
	  long: o.long,
      timestamp: new Date()
    });
	
	var user = Meteor.users.find({_id: this.userId}).fetch()[0];
	var locarray;
	$.getJSON('http://api.geonames.org/findNearestAddressJSON?lat=" + o.lat + "&lng=" + o.long + "&username=demo', function(data) {
    locarray = data;
});
	var address = locarray['address']['streetNumber'] + " " + locarray['address']['street'];
	$.ajax({
		url: 'https://api.parse.com/1/push',
		type: "POST",
		contentType: "application/json",
		port: 443,
		data: JSON.stringify({"where": {"objectId": 'pC2h2n3zkR'}, "data": {"alert": user.username + " wants to getLo " + address}}),
		headers: {"X-Parse-Application-Id": 'm31OmA2VnCG1cR6DEzeBJzNOHPIkH3j0eAVPFR7P', "X-Parse-REST-API-Key": 'FxRbprMjTmLmoUchaLp3BxVxIDzZwCWFiEwhyoAT'}
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
