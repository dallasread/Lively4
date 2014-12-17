import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
			if (!this.get('content.read')) {
				if (!this.get('content.from_agent')) {
					this.get('content').set('read', true);
					this.get('content.contact').then(function(contact) {
						contact.save();
					});
				}
			}
		}
});
