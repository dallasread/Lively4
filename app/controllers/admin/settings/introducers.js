import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createIntroducer: function() {
			var introducer = this.store.createRecord('introducer', {
				chatbox: this.session.chatbox,
				name: "",
				permalink: "",
				required: true,
				active: false,
				type: "text",
				validator: "presence",
				ordinal: this.session.get('chatbox.introducers').get('length')
			});
			this.session.chatbox.get('introducers').addObject(introducer);
			this.session.chatbox.save();
		},
		deleteIntroducer: function(introducer) {
			if (confirm("Are you sure you want to delete this introducer?")) {
				this.session.chatbox.get('introducers').removeObject(introducer);
				this.session.chatbox.save();
			}
		}
	}
});
