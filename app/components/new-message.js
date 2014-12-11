import Ember from 'ember';

export default Ember.Component.extend({
	type: "visitor",
	typing: false,
	textareaHasContent: function() {
		var e = this;
		
		if (this.type === "visitor") {
			this.get('visitor').then(function(visitor) {
				visitor.set(e.type + '_typing', !!Ember.$.trim(e.body).length);
				visitor.save();
			});
		} else {
			this.visitor.set(e.type + '_typing', !!Ember.$.trim(e.body).length);
			this.visitor.get('content').save();
		}
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
			
			var message = this.get('store').createRecord('message', {
				body: body,
				from_agent: this.type === "agent",
			});
			
			if (this.type === "agent") { message.set('agent', this.agent); }

			this.visitor.get('messages').addObject(message);
			if (this.type === "visitor") {
				this.get('visitor').then(function(visitor) {
					visitor.save();	
				});
			} else {
				this.visitor.get('model').save();				
			}
		}
	}
});
