import Ember from 'ember';

export default Ember.ObjectController.extend({
	watchActive: function() {
		this.chatbox.settings.save();
	}.observes('active')
});
