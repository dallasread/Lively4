import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		showChatbox: function() {
			this.get('currentController').transitionToRoute( 'chatbox' );
		}
	}
});
