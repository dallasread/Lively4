import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createCanned: function() {
			this.store.createRecord('canned', {
				chatbox: this.chatbox.settings,
				hash: "",
				message: { body: "" }
			});
			this.chatbox.settings.save();
		},
		deleteCanned: function(canned) {
			if (confirm("Are you sure you want to delete this canned?")) {
				canned.destroyRecord();
				this.chatbox.settings.save();
			}
		}
	}
});
