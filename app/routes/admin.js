import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (this.get('session.contact')) {
			this.transitionTo( 'chatbox' );
		}
	}
});
