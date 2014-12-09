import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
	firebase: window.LCSDB,
  pathForType: function(type) {
		var chatbox = null;
		
	  if (type === "visitor") {
			chatbox = this.container.lookup('session:main').get('chatbox.id');
			return "visitors/" + chatbox;
	  } else if (type === "agent") {
			chatbox = this.container.lookup('session:main').get('chatbox.id');
			return "chatboxes/" + chatbox + "/agents";
		} else if (type === "message") {
			chatbox = this.container.lookup('session:main').get('chatbox.id');
			var visitor = this.container.lookup('session:main').get('visitor.id');
			return "visitors/" + chatbox + "/" + visitor + "/messages";
		} else {
			var camelized = Ember.String.camelize(type);
      return Ember.String.pluralize(camelized);
		}
  }
});