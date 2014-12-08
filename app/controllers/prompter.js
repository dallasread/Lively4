import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		showChatbox: function() {
			this.transitionToRoute( 'chatbox' );
		}
	}
});
