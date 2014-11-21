import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['settings'],
	settings: Ember.computed.alias('controllers.settings.chatbox')
});
