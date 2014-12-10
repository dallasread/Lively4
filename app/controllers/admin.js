import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		Ember.$('body').css('overflow-y', 'hidden');
	},
	actions: {
		toggleStatus: function() {
			this.session.agent.set('online', !this.session.agent.get('online'));
			this.session.chatbox.save();
		}
	}
});
