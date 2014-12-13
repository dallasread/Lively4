import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
	firebase: window.LCSDB,
  pathForType: function(type) {
		if (type === "contact") {
			if (!window.LCSCB) {
				window.LCSCB = this.container.lookup('session:main').get('chatbox.id');
			}
			return "contacts/" + window.LCSCB;
	  } else if (type === "canned") {
			return "canned";
		} else {
			var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
		}
  }
});