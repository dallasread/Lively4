import Ember from 'ember';

export default Ember.ObjectController.extend({
	watchBody: function() {
		this.session.chatbox.save();
	}.observes('message.body')
});
