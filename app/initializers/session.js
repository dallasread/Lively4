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
			var session = Ember.Object.create({
				auth: auth,
				url: 'http://localhost:4200'
			});
			
			store.find('chatbox', token).then(function(chatbox) {
				session.set('chatbox', chatbox);
				
				if (!window.LCSInjected) {
					window.LCSInjected = true;
					app.register('session:main', session, { instantiate: false, singleton: true });
					app.inject('route', 'session', 'session:main');
					app.inject('controller', 'session', 'session:main');
					app.advanceReadiness();
				}
				
				if (auth) {
					store.find('agent', auth.uid).then(function(agent) {
						if (!agent.get('online')) {
							agent.set('online', true);
							chatbox.save();
						}
						
						session.set('agent', agent);
						
						window.LCSDB.child('.info/connected').on("value", function() {
							window.LCSDB.child('chatboxes/' + chatbox.id + '/agents/' + auth.uid + '/online').onDisconnect().set(false);
						});
					}, function() {
						session.set('visitor', store.find('visitor', auth.uid));
						
						window.LCSDB.child('.info/connected').on("value", function() {
							window.LCSDB.child('visitors/' + chatbox.id + '/' + auth.uid + '/online').set(true);
							window.LCSDB.child('visitors/' + chatbox.id + '/' + auth.uid + '/online').onDisconnect().set(false);
							app.advanceReadiness();
						});
					});
				} else {
					window.LCSDB.authAnonymously(function(error, auth) {
					  if (error) {
							console.log("Lively Chat Support could not connect.", error);
					  } else {
							store.createRecord('visitor', {
								id: auth.uid,
								anonymous: true
							}).save();
					  }
					});
				}
			}, function() {
				console.log("Lively Chat Support token \"" + token + "\" does not exist.");
			});
		});
		
		app.deferReadiness();
	}
};
