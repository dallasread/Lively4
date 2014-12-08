import Ember from 'ember';

export default {
  name: 'session',
	after: 'store',
  initialize: function(container, app) {
		window.LCSDB = new window.Firebase("https://lcs4.firebaseio.com");
		window.FastClick.attach(document.body);
		//window.LCSDB.unauth();
		
		window.LCSDB.onAuth(function(auth) {
			var token = Ember.$('[data-lcs]').data('lcs');
			var store = container.lookup('store:main');
	
			store.find('chatbox', token).then(function(chatbox) {
				var session = Ember.Object.extend({
					auth: null,
					user: null,
					chatbox: null,
					visitor: null,
					init: function() {
						var e = this;
						
						window.LCSDB.offAuth(function(){
							e.set('root_path', null);
							e.set('auth', null);
							e.set('visitor', null);
						});
						
						e.set('chatbox', chatbox);
						e.set('url', 'http://localhost:4200');

						if (auth) {
							// IF USER IS AGENT, GRAB INFO, SET BOOL
							// IF USER IS VISITOR, GRAB INFO, SET BOOL
							e.set('root_path', 'chatbox');
							e.set('auth', auth);
							e.set('visitor', store.find('visitor', auth.uid));
							//e.set('agent', store.find('agents', auth.uid));
						} else {
							window.LCSDB.authAnonymously(function(error, auth) {
							  if (error) {
									console.log("Lively Chat Support could not connect.", error);
							  } else {
									store.createRecord('visitor', {
										id: auth.uid,
										anonymous: true,
										details: {
											name: "Guest"
										}
									}).save();
							  }
							});
						}
					}
				});
				
				if (!window.LCSInjected) {
					window.LCSInjected = true;
					app.register('session:main', session);
					app.inject('route', 'session', 'session:main');
					app.inject('controller', 'session', 'session:main');
					app.advanceReadiness();	
				}
			}, function() {
				console.log("Lively Chat Support token does not exist.");
			});
		});
		
		app.deferReadiness();
	}
};
