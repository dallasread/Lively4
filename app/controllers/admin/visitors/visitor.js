import Ember from 'ember';

export default Ember.ObjectController.extend({
	messageAdded: function() {
		this.send('scrollMessages');
	}.observes('messages.@each'),
	actions: {
		showMore: function() {
			Ember.$('.more').slideToggle();
		},
		scrollMessages: function() {
			var $ = Ember.$;
			var messages = $('.visitor_profile_messages');
			messages.stop().animate({
				scrollTop: messages.prop("scrollHeight")
			}, 250);
		},
		createMessage: function() {
			var body = Ember.$.trim(this.get('body'));
			var visitor = this.get('model');
			var message = this.store.createRecord('message', {
				body: body,
				from_agent: true,
				agent: this.get('session.agent')
			});
			
			this.set('body', '');
			visitor.get('messages').addObject(message);
			visitor.save();
		}
	}
});
