import Ember from 'ember';

export default Ember.Route.extend({
	afterModel: function() {
		//if (this.get("session.visitor.introduced")) {
			this.transitionTo( 'chatbox' );
		//}
	}
});
