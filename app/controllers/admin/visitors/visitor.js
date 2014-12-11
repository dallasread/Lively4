import Ember from 'ember';

export default Ember.ObjectController.extend({
	activate: function() {
		alert("hi");
	},
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
		}
	}
});
