import Ember from 'ember';

export default Ember.Route.extend({
	afterModel: function() {
		if (!this.get("session.visitor.registered")) {
			this.transitionTo( 'chatbox.register' );
		}
	}
});
