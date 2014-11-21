import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['settings'],
	settings: Ember.computed.alias('controllers.settings.chatbox')
});
