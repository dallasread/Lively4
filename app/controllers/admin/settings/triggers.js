import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTrigger: function() {
			this.store.createRecord('trigger', {
				chatbox: this.chatbox.settings,
				delay: 1000,
				active: false,
				exclude: "",
				include: "*",
				message: { body: "" }
			});
			this.chatbox.settings.save();
		},
		deleteTrigger: function(trigger) {
			if (confirm("Are you sure you want to delete this trigger?")) {
				trigger.destroyRecord();
				this.chatbox.settings.save();
			}
		}
	}
});
