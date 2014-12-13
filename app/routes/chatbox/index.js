import Ember from 'ember';

export default Ember.Route.extend({
	afterModel: function() {
		// if (!this.session.get('contact.introduced')) {
		// 	this.transitionTo( 'chatbox.register' );
		// }
	}
});
