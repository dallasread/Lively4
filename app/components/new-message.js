import Ember from 'ember';

export default Ember.Component.extend({
	type: "contact",
	submittable: false,
	textareaHasContent: function() {
		var typing = !!Ember.$.trim(this.body).length;
		var field = this.type + '_typing';
		if (this.contact.get(field) !== typing) {
			this.set('submittable', typing);
			this.contact.set(field, typing).save();
		}
	}.observes('body'),
	actions: {
		createMessage: function() {
			var body = Ember.$.trim(this.get('body'));
			this.set('body', '');
			
			if (body.length) {
				if (this.type === "agent") {
					this.chatbox.get('canned').forEach(function(canned) {
						body = body.replace(new RegExp("#" + canned.get('hash'), "mi"), canned.get('message'));
					});
				}
			
				var message = this.store.createRecord('message', {
					body: body,
					from_agent: this.type === "agent",
				});
			
				if (this.type === "agent") {
					message.set('agent', this.agent);
					this.contact.set('agent', this.agent)
				}

				this.contact.get('messages').addObject(message);
				this.contact.set(this.type + '_last_seen', new Date());
				this.contact.save();
			}
		}
	}
});
