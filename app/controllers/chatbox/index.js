import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
		this.get('session.visitor').then(function(visitor) {
			visitor.get('unread_from_agent').forEach(function(message) {
				message.set('read', true).save();
			});
		});
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
			this.store.createRecord('message', {
				body: Ember.$.trim(this.get('body')),
				from_agent: false
			}).save();
			this.set('body', '');
			this.send('scrollMessages');
		}
	}
});
