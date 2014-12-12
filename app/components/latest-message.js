import Ember from 'ember';

export default Ember.Component.extend({
	ding: function() {
		if (this.get('unread') > 0) {
			this.get('session.ding').play();
		}
	}.observes('unread'),
	actions: {
		showChatbox: function() {
			this.get('currentController').transitionToRoute( 'chatbox' );
		}
	}
});
