import Ember from 'ember';

export default Ember.View.extend({
	didInsertElement: function() {
		if (!this.get('content.read')) {
			if (this.get('content.from_agent')) {
				this.get('session.ding').play();
				this.get('content').set('read', true);
				this.session.get('visitor').then(function(visitor) {
					visitor.save();
				});
			}
		}
	}
});
