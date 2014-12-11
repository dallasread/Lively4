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
			setTimeout(function() {
				var $ = Ember.$;
				var messages = $('.visitor_profile_messages');
				messages.stop().animate({
					scrollTop: messages.prop("scrollHeight")
				}, 250);
			}, 50);
		},
		createMessage: function() {
			var e = this;
			var body = Ember.$.trim(this.get('body'));
			var visitor = this.get('model');
			this.set('body', '');
			this.session.chatbox.get('canned').forEach(function(canned) {
				body = body.replace(new RegExp("#" + canned.get('hash'), "mi"), canned.get('message'));
			});
			
			var message = e.store.createRecord('message', {
				body: body,
				from_agent: true,
				agent: e.get('session.agent')
			});

			visitor.get('messages').addObject(message);
			visitor.save();
		}
	}
});
