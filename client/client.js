Los = new Meteor.Collection("los");

Deps.autorun(function () {
  if (Meteor.user()) {
    // If the user is logged in, load all of the requests.
    Meteor.subscribe("allLos", new Date());
//    Meteor.subscribe("userData");
  } else {
    // If not logged in, don't load anything
  };
});