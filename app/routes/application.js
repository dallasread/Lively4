import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		saveChatbox: function() {
			this.session.chatbox.save().then(function() {
				Ember.$.jGrowl('Your settings have been saved.', {
					position: 'bottom-right'
				});
			});
		},
		signinout: function() {
			var e = this;

			if (this.session.get('auth')) {
				var msg = "Are you sure you want to leave this chat session?";
				if (this.get('session.agent')) {
					msg = "Are you sure you want to log out?";
				}
				
				if (confirm(msg)) {
					e.store.unloadAll('message');
					e.store.unloadAll('contact');
					e.session.set('auth', null);
					e.session.set('contact', null);
					e.session.set('agent', null);
					window.LCSDB.unauth();
					e.transitionTo('prompter');
				}
			}
		}
	}
});
