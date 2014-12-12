import Ember from 'ember';

export default Ember.Component.extend({
	ding: function() {
		this.get('session.ding').play();
	}.observes('unread'),
	actions: {
		showChatbox: function() {
			this.get('currentController').transitionToRoute( 'chatbox' );
		}
	}
});
