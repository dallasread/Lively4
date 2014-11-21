import Ember from 'ember';

export default Ember.ObjectController.extend({
	chatbox: null,
	init: function() {
		var chatbox = this.store.find('chatbox', 'UNEXISTENT');
		this.set('chatbox', chatbox);
  }
});
