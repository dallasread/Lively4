import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		toggleStatus: function() {
			this.get('session.agent').set('online', !this.get('session.agent.online')).save();
		}
	}
});
