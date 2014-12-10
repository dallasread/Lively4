import Ember from 'ember';

export default Ember.ArrayController.extend({
	actions: {
		createAgent: function() {
			var agent = this.store.createRecord('agent', {
				name: "",
				email: ""
			});
			this.session.chatbox.get('agents').addObject(agent);
			this.session.chatbox.save();
		},
		deleteAgent: function(agent) {
			if (confirm("Are you sure you want to delete this agent?")) {
				this.session.chatbox.get('agents').removeObject(agent);
				this.session.chatbox.save();
			}
		}
	}
});
