import Ember from 'ember';

export default Ember.ObjectController.extend({
	init: function() {
		if (this.get('session.registered')) {
			this.transitionToRoute( 'chatbox' );
		}
	},
	actions: {
		registerViaEmail: function() {
			var visitor = {};
			var $ = Ember.$;
			// CREATE VISITOR
			// LOG IN VISITOR
			// SAVE VISITOR DETAILS
			// REDIRECT TO 
			$("#lcs .introducer input").each(function() {
				visitor[$(this).attr('name')] = $(this).val();
			});
			this.store.createRecord('visitor', {
				details: visitor
			}).save();
		},
		registerViaFacebook: function() {
			window.LCSDB.authWithOAuthPopup("facebook", function(error) {
				console.log("done", error);
			});
		}
	}
});
