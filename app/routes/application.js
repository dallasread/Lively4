import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		saveChatbox: function() {
			this.chatbox.settings.save();
		},
		signinout: function() {
			var current = this.controllerFor("application").get("currentPath");
			var route = current === "chatbox.signin" ? "chatbox" : "chatbox.signin";
			this.transitionTo(route);
		}
	}
});
