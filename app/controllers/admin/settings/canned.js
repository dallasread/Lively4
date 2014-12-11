import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createCanned: function() {
			var canned = this.store.createRecord('canned', {
				hash: "",
				message: ""
			});
			this.session.chatbox.get('canned').addObject(canned);
			this.session.chatbox.save();
		},
		deleteCanned: function(canned) {
			if (confirm("Are you sure you want to delete this canned message?")) {
				this.session.chatbox.get('canned').removeObject(canned);
				this.session.chatbox.save();
			}
		}
	}
});
