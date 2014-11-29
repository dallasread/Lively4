import Ember from 'ember';

export default {
  name: 'chatbox',
  initialize: function(container, app) {
		//app.deferReadiness();
		
		var chatbox = Ember.Object.extend({
			settings: null,
			init: function() {
				var token = "UNEXISTENT";
				var store = container.lookup('store:main');
				var chatbox = this;
				
				store.find('chatbox', token).then(function(settings) {
					chatbox.set('settings', settings);
					//app.advanceReadiness();
				});
			}
		});
		
		app.register('chatbox:main', chatbox);
		app.inject('route', 'chatbox', 'chatbox:main');
		app.inject('controller', 'chatbox', 'chatbox:main');
	}
};
