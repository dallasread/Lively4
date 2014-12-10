import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		// this.session.visitor.get('unread_from_agent').forEach(function(message) {
		// 	message.set('read', true);
		// });
		// this.session.visitor.save();
	},
	messageAdded: function() {
		this.send('scrollMessages');
	}.observes('session.visitor.messages.@each'),
	textareaHasContent: function() {
		this.session.visitor.set('typing', !!Ember.$.trim(this.body).length);
	}.observes('body'),
	actions: {
		scrollMessages: function() {
			var $ = Ember.$;
			var messages = $('#lcs .chatbox .messages');
			messages.stop().animate({
				scrollTop: messages.prop("scrollHeight")
			}, 250);
		},
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
