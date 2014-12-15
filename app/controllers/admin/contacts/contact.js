import Ember from 'ember';

export default Ember.ObjectController.extend({
	messageAdded: function() {
		this.send('scrollMessages');
	}.observes('messages.@each'),
	watchContact: function() {
		this.get('model').save();
  }.observes('agent.content'),
	isCurrentAgent: function() {
		return this.session.agent === this.get('agent.content');
	}.property('agent.content'),
	isCurrentAgentOrAdmin: function() {
		return this.session.agent.get('admin') || this.session.agent === this.get('agent.content');
	}.property('agent.content'),
	actions: {
		showMore: function() {
			Ember.$('.more').slideToggle();
		},
		scrollMessages: function() {
			setTimeout(function() {
				var $ = Ember.$;
				var messages = $('.contact_profile_messages');
				messages.stop().animate({
					scrollTop: messages.prop("scrollHeight")
				}, 250);
			}, 50);
		}
	}
});
