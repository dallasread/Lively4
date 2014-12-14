import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTrigger: function() {
			var trigger = this.store.createRecord('trigger', {
				chatbox: this.session.chatbox,
				delay: 7,
				active: false,
				exclude: "",
				include: "*",
				message: ""
			});
			this.session.chatbox.get('triggers').addObject(trigger);
		},
		deleteTrigger: function(trigger) {
			if (confirm("Are you sure you want to delete this trigger?")) {
				this.session.chatbox.get('triggers').removeObject(trigger);
				this.session.chatbox.save();
			}
		}
	}
});
