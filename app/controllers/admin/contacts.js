import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['online', 'contact_last_seen'],
  sortAscending: false,
	showAll: function() {
		return this.get('filter') === 'all';
	}.property('filter'),
	filter: 'assigned',
	contacts: function() {
		var e = this;
		var content = this.get('content');
    var filter = this.get('filter');

    return content.filter(function(contact) {
			if (filter === 'all') {
				return true;
			} else {
				return contact.get('agent.id') === e.get('session.agent.id');
			}
    });
	}.property('content.@each', 'filter'),
	actions: {
		setFilter: function(filter) {
			if (this.get('filter') !== filter) {
				this.set('filter', filter);
			}
		}
	}
});
