import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		var e = this;

		if (this.session.contact && !this.session.contact.get('messages').get('length')) {
			var message = this.store.createRecord('message', {
				body: this.session.chatbox.get('online') ? this.session.chatbox.get('initial_online_message') : this.session.chatbox.get('initial_offline_message'),
				agent: this.session.contact.agent,
				from_agent: true
			});
			e.get('session.contact').get('messages').addObject(message);
			e.get('session.contact').set('agent_last_seen', new Date());
			this.get('session.contact').save();
		}
	}
});
