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
	}.observes('body')
});
