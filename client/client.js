Los = new Meteor.Collection("los");
Contacts = new Meteor.Collection("contacts");

Deps.autorun(function () {
  if (Meteor.user()) {
    Meteor.subscribe("myLos", Meteor.user());
	Meteor.subscribe("myContacts", Meteor.user());
  };
});