import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (email) {
  var a = "<a href='mailto:" + email + "'>" + email + "</a>";
	return new Ember.Handlebars.SafeString(a);
});
