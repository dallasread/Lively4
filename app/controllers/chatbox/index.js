import Ember from 'ember';

export default Ember.Controller.extend({
	scrollMessages: function() {
		setTimeout(function() {
			var $ = Ember.$;
			var messages = $('#lcs .chatbox .messages');
			messages.stop().animate({
				scrollTop: messages.prop("scrollHeight")
			}, 250);
		}, 10);
	},
	messageAdded: function() {
		this.scrollMessages();
	}.observes('session.visitor.messages.@each'),
	textareaHasContent: function() {
		this.session.visitor.set('typing', !!Ember.$.trim(this.body).length);
	}.observes('body'),
	actions: {
		createMessage: function() {
			var e = this;
			var body = Ember.$.trim(e.get('body'));
			e.set('body', '');
			
			this.get('session.visitor').then(function(visitor) {
				var message = e.store.createRecord('message', {
					body: body,
					from_agent: false
				});
				
				visitor.get('messages').addObject(message);
				visitor.save();
			});
		}
	}
});
