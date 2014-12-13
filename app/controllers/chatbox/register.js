import Ember from 'ember';

export default Ember.ObjectController.extend({
	init: function() {
		if (this.get('session.contact.introduced')) {
			this.transitionToRoute( 'chatbox' );
		}
	},
	actions: {
		registerViaEmail: function() {
			var details = {};
			var $ = Ember.$;
			var e = this;

			$("#lcs .introducer input").each(function() {
				details[$(this).attr('name')] = $(this).val();
			});
			
			if (!this.session.get('contact.agent.online')) {
				this.session.set('contact.agent', this.session.chatbox.get('next_available_agent'));
			}
			
			this.session.contact.setProperties({
				details: details,
				introduced: true
			}).save().then(function() {
				e.transitionToRoute('chatbox');
			});
		},
		registerViaFacebook: function() {
			window.LCSDB.authWithOAuthPopup("facebook", function(error) {
				alert("logged in!");
			});
		}
	}
});
