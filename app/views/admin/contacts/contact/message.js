import Ember from 'ember';

export default Ember.View.extend({
	scrollMessages: function() {
		var $ = Ember.$;
		var messages = $('.contact_profile_messages');
		messages.stop().animate({
			scrollTop: messages.prop("scrollHeight")
		}, 250);
	},
	didInsertElement: function() {
		if (!this.get('content.read')) {
			if (!this.get('content.from_agent')) {
				this.get('content').set('read', true);
				this.get('content.contact').then(function(contact) {
					contact.save();
				});
			}
		}
		this.scrollMessages();
	}
});
