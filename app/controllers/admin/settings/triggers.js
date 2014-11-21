import Ember from 'ember';

export default Ember.ArrayController.extend({
	setupController: function() {
		controller.set('model', this.store.findAll('trigger'));
	}
});
