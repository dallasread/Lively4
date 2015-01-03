import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (!this.get('session.chatbox.activated')) {
			this.transitionTo( 'admin.activate' );
		}
	}
});
