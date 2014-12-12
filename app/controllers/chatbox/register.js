import Ember from 'ember';

export default Ember.ObjectController.extend({
	init: function() {
		if (this.get('session.visitor.registered')) {
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
			
			this.session.visitor.setProperties({
				details: details,
				registered: true
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
