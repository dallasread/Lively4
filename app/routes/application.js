import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		saveChatbox: function() {
			this.session.chatbox.save().then(function() {
				
			}).catch(function(err) {
				console.log(err);
				
			});
		},
		signinout: function() {
			if (this.get('session.auth')) {
				var msg = "Are you sure you want to leave this chat session?";
				if (this.get('session.agent')) {
					msg = "Are you sure you want to log out?";
				}
				
				if (confirm(msg)) {
					window.LCSDB.unauth()
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
