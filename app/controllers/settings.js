import Ember from 'ember';

export default Ember.ObjectController.extend({
	chatbox: null,
	init: function() {
		this.set('chatbox', this.store.find('chatbox', 'UNEXISTENT'));
  }
});
