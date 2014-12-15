import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTrigger: function() {
			var trigger = this.store.createRecord('trigger', {});
			this.session.chatbox.get('triggers').addObject(trigger);
			this.session.chatbox.save();
		},
		deleteTrigger: function(trigger) {
			if (confirm("Are you sure you want to delete this trigger?")) {
				this.session.chatbox.get('triggers').removeObject(trigger);
				this.session.chatbox.save();
			}
		}
	}
});
