var o = {}; // for o.lo
Template.feed.events({
    'click .logout': function () {
		Meteor.logout()
    },
	'click .plus': function(){
		$('.addcontact.modal').modal()
	}
});

Template.feed.name = function () {
	return Meteor.user().profile.name
};

setTimeout(function(){Template.feed.warning = function () {return true}},2000);
try {
	navigator.geolocation.getCurrentPosition(function (lo) {
		setLo(lo.coords);
		Template.feed.warning = function () {return false}
	})
}
catch (e) {
	setlo();
	Template.feed.warning = function () {return true}
}

Template.activelos.los = function () {
  return Los.find({$or: [
	  {recipient: Meteor.user().username},
	  {sender: Meteor.user().username}
  ]}, {
    sort: {timestamp: -1},
    limit: 35
  })
};

Template.lo.rendered = function () {
  $(this.find('.lo'))
    .transition('fade up in');
};

Template.feed.events({
  'click .logout': function () {
	Meteor.logout()
  },
  'click .plus': function(){
  	$('.addcontact.modal').modal()
  },
  'click .submit.btn': function () {
    Meteor.call('post', {
		sender: Meteor.user().username,
		lat: o.lo.latitude,
		long: o.lo.longitude,
		recipient: getRecipient()
	});
    clearInput();
  },
  'keyup #post' : function (event) {
    if (event.keyCode === 13) {
      Meteor.call('post', {
		  content: o.lo,
		  recipient: getRecipient()
	  });
      clearInput();
    }
  }
});

setLo = function (coords) {
  o.lo = coords;
  return $('#post').val(String(coords.latitude) + " ; " + String(coords.longitude))
}

getRecipient = function () {
  return $('#recipient').val();
};

clearInput = function () {
  $('#recipient').val("");
};

Template.contact.contacts = function () {
	return [
		{
			username: "example_friend"
		},
		{
			username: "another example"
		}
	]
}