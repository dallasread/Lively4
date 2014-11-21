import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		createTrigger: function(chatbox) {
			console.log(chatbox.content)
		}
	}	
});
