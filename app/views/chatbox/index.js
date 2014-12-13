import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		var e = this;

		if (this.session.visitor && !this.session.visitor.get('messages').get('length')) {
			var message = this.store.createRecord('message', {
				body: this.session.chatbox.get('initial_message'),
				agent: this.session.visitor.agent,
				from_agent: true
			});
			e.session.visitor.get('messages').addObject(message);
			this.session.visitor.save();
		}
	}
});
