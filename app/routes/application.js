import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		saveChatbox: function() {
			this.session.chatbox.save();
		},
		signinout: function() {
			if (this.get('session.auth')) {
				if (confirm("Are you sure you want to leave this chat session?")) {
					window.LCSDB.unauth();
					this.transitionTo('prompter');
				}
			} else {
				var current = this.controllerFor("application").get("currentPath");
				var route = current === "chatbox.signin" ? "chatbox" : "chatbox.signin";
				this.transitionTo(route);
			}
		}
	}
});
