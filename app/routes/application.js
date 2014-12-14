import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		saveChatbox: function() {
			this.session.chatbox.save();
		},
		signinout: function() {
			var e = this;

			if (this.session.get('auth')) {
				var msg = "Are you sure you want to leave this chat session?";
				if (this.get('session.agent')) {
					msg = "Are you sure you want to log out?";
				}
				
				if (confirm(msg)) {
					e.session.contact.set('online', false).save().then(function() {
						e.store.unloadAll('message');
						e.store.unloadAll('contact');
						e.session.set('auth', null);
						e.session.set('contact', null);
						e.session.set('agent', null);
						window.LCSDB.unauth();
						e.transitionTo('prompter');
					});
				}
			} else {
				var current = this.controllerFor("application").get("currentPath");
				var route = current === "chatbox.signin" ? "chatbox" : "chatbox.signin";
				this.transitionTo(route);
			}
		}
	}
});
