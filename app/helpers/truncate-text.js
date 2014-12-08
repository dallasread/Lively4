import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (str, len) {
  if (str.length > len) {
		str = str.substring(0, len - 3) + '&#8230;';
  }
	
	return new Ember.Handlebars.SafeString(str);
});
