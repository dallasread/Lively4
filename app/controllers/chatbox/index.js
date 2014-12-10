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
		var new_message = Ember.$("#lcs .new_message");
		
		if (this.body.length) {
			new_message.removeClass("is_disabled");
		} else {
			new_message.addClass("is_disabled");
		}
	}.observes('body'),
	actions: {
		scrollMessages: function() {
			var $ = Ember.$;
			var messages = $('#lcs .chatbox .messages');
			messages.animate({
				scrollTop: $('#lcs .chatbox .messages').prop("scrollHeight")
			}, 250);
		},
		createMessage: function() {
			var e = this;
			var body = Ember.$.trim(e.get('body'));
			e.set('body', '');
			
			this.get('session.visitor').then(function(visitor) {
				var message = e.store.createRecord('message', {
					visitor: visitor,
					body: body,
					from_agent: false
				});
				
				e.send('scrollMessages');
			});
		}
	}
});
