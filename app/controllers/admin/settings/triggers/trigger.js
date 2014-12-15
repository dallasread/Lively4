import Ember from 'ember';

export default Ember.ObjectController.extend({
	watchActive: function() {
		this.session.chatbox.save();
	}.observes('active', 'state'),
	states: [{
			name: 'Online',
			value: 'online'
		}, {
			name: 'Offline',
			value: 'offline'
	}]
});
