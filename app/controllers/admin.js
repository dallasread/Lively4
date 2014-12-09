import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		Ember.$('body').css('overflow-y', 'hidden');
	},
	actions: {
		toggleStatus: function() {
			this.get('session.agent').set('online', !this.get('session.agent.online')).save();
		}
	}
});
