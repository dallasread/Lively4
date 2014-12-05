import Ember from 'ember';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window.LCSDB = new window.Firebase("https://lcs4.firebaseio.com");
		
		window.LCSDB.onAuth(function(auth) {
			var token = Ember.$('[data-lcs]').data('lcs');
			var store = container.lookup('store:main');
			var router = container.lookup('router:main');
	
			store.find('chatbox', token).then(function(chatbox) {
				var session = Ember.Object.extend({
					auth: null,
					user: null,
					chatbox: null,
					init: function() {
						var e = this;
						e.set('chatbox', chatbox);
						e.set('url', 'http://localhost:4200');

						if (auth) {
							// IF USER IS AGENT, GRAB INFO, SET BOOL
							// IF USER IS VISITOR, GRAB INFO, SET BOOL
							e.set('root', 'chatbox');
							e.set('auth', auth);
							e.set('user', store.find('user', auth.uid));
						} else {
							// CREATE ANONY!?
							e.set('auth', null);
							e.set('user', null);
							e.set('root', 'prompter');
						}
					}
				});
				
				app.register('session:main', session);
				app.inject('route', 'session', 'session:main');
				app.inject('controller', 'session', 'session:main');
				app.advanceReadiness();
			}, function() {
				console.log("Lively Chat Support token does not exist.");
			});
		});
		
		app.deferReadiness();
	}
};
