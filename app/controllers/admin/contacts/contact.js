import Ember from 'ember';

export default Ember.ObjectController.extend({
	agent_saving: false,
	messageAdded: function() {
		this.send('scrollMessages');
	}.observes('messages.@each'),
	watchAgent: function() {
		if (!this.get('agent_saving') && !this.session.agent.get('admin') && this.get('agent.id') !== this.session.agent.get('id')) {
			if (confirm("Are you sure you want to transfer this conversation?")) {
				var e = this;
				this.set('agent_saving', true);
				this.get('model').save().then(function() {
					e.set('agent_saving', false);
					if (!e.session.agent.get('admin')) {
						e.transitionTo( 'admin.contacts' );
					}
				});
			} else {
				this.get('model').rollback();
			}
		} else {
			this.get('model').save();
		}
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
