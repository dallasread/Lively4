import Ember from 'ember';

export default Ember.Component.extend({
	type: "contact",
	typing: false,
	textareaHasContent: function() {
		this.contact.set(this.type + '_typing', !!Ember.$.trim(this.body).length);
		this.contact.save();
	}.observes('body'),
	actions: {
		createMessage: function() {
			var body = Ember.$.trim(this.get('body'));
			
			this.set('body', '');
			
			if (this.type === "agent") {
				this.chatbox.get('canned').forEach(function(canned) {
					body = body.replace(new RegExp("#" + canned.get('hash'), "mi"), canned.get('message'));
				});
			}
			
			var message = this.store.createRecord('message', {
				body: body,
				from_agent: this.type === "agent",
			});
			
			if (this.type === "agent") { message.set('agent', this.agent); }

			this.contact.get('messages').addObject(message);
			this.contact.set(this.type + '_last_seen', new Date());
			this.contact.save();
		}
	}
});
