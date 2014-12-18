import Ember from 'ember';

export default Ember.ArrayController.extend({
	showAll: function() {
		return this.get('filter') === 'all';
	}.property('filter'),
	filter: 'assigned',
	contacts: function() {
		if (this.session.agent.get('admin') && this.get('filter') === 'all') {
			return this.get('content');
		} else {
			var e = this;
			return this.get('content').filter(function(contact) {
				return contact.get('agent.id') === e.session.agent.id;
			});
		}
	}.property('filter', 'session.agent.admin', 'content.@each.agent'),
	actions: {
		setFilter: function(filter) {
			if (this.get('filter') !== filter) {
				this.set('filter', filter);
			}
		}
	}
});
