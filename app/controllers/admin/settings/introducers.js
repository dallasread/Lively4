import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createIntroducer: function() {
			this.store.createRecord('introducer', {
				chatbox: this.chatbox.settings,
				name: "",
				permalink: "",
				required: true,
				active: false,
				type: "text",
				validator: "presence",
				priority: 999
			});
			this.chatbox.settings.save();
		},
		deleteIntroducer: function(introducer) {
			if (confirm("Are you sure you want to delete this introducer?")) {
				introducer.destroyRecord();
				this.chatbox.settings.save();
			}
		}
	}
});
