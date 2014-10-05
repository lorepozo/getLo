	var o = {}; // for o.lo
	Template.feed.events({
	    'click .logout': function () {
			Meteor.logout()
	    }
	});

	Template.feed.name = function () {
		return Meteor.user().profile.name
	}

	try {
		navigator.geolocation.getCurrentPosition(function (lo) {
			setLo(lo.coords)
		})
	}
	catch (e) {
		setlo()
	}

	Template.feed.los = function () {
	  return Los.find({$or: [
		  {receiver: Meteor.user().username},
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
	  'click .submit.button': function () {
		lo = getLo();
	    Meteor.call('post', {
			content: lo,
			lat: /(.*?)\s;/.exec(lo)[1],
			long: /;\s(.*?)/.exec(lo)[1],
			recipient: getRecipient()
		});
	    clearInput();
	  },
	  'keyup #post' : function (event) {
	    if (event.keyCode === 13) {
	      Meteor.call('post', {
			  content: getLo(),
			  recipient: getRecipient()
		  });
	      clearInput();
	    }
	  }
	});

	getLo = function () {
	  return $('#post').val();
	};

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