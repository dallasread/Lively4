import Ember from 'ember';

export default Ember.ObjectController.extend({
	watchActive: function() {
		this.session.chatbox.save();
	}.observes('admin')
});
